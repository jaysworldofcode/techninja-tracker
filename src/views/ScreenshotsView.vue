<template>
    <v-container class="container">
        <v-row  class="mt-4">
            <v-col md="6" lg="8" sm="12" xs="12" xl="8">
            </v-col>
            <v-col md="6" lg="4" sm="12" xs="12" xl="4">
                <date-range-picker v-model="dateRange" @update="dateFilterChange">
                    <template #input="picker">
                        <div fluid fill-width class="d-flex justify-center overline">
                            <div class="d-flex justify-center align-center">
                                <svg-icon type="mdi" :path="icons.mdiCalendarRange" class="mr-4"></svg-icon>
                            </div>
                            Filter Date: {{ picker.startDate | date }} - {{ picker.endDate | date }}
                        </div>
                    </template>
                    <template #date="data">
                        <span class="small">{{ data.date | dateCell }}</span>
                    </template>
                    <template #ranges="ranges">
                        <div class="ranges">
                            <ul>
                                <li v-for="(range, name) in ranges.ranges" :key="name" @click="ranges.clickRange(range)">
                                    <b>{{ name }}</b> <small class="text-muted">{{ range[0].toDateString() }} -
                                    {{ range[1].toDateString() }}</small>
                                </li>
                            </ul>
                        </div>
                    </template>
                </date-range-picker>
            </v-col>
        </v-row>
        <!-- <v-row  class="mb-12">
            <v-col cols="6">
            </v-col>
            <v-col cols="6">
                <v-combobox v-model="select" :items="items" label="Select User" multiple></v-combobox>
            </v-col>
        </v-row> -->
        <div v-if="(sessions.length == 0)" class="text-center mt-8">
            <span class="font-weight-bold blue-grey--text display-1">No result</span>
            <lottie-animation :loop="true" :animationData="require('@/assets/lottie/astronaut.json')"/>
        </div>
        <div v-else>
            <v-row v-if="isFetchingLoading">
                <v-col v-for="i in 9" :key="i" class="d-flex child-flex" md="4" lg="2" sm="1" xs="1" xl="2">
                    <v-skeleton-loader type="image, list-item-two-line"></v-skeleton-loader>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col v-for="i in sessions" :key="i._id" class="d-flex child-flex" md="4" lg="2" sm="1" xs="1" xl="2">
                    <screenshot-item :data="i"></screenshot-item>
                </v-col>
            </v-row>
        </div>
        <div class="d-flex justify-center mt-12 white--text" v-if="(sessions.length != 0)">
            <v-btn v-if="(isSeeMoreLoading == false)" depressed color="pink accent-3" class="white--text" @click="fetchSession(true)">
                <svg-icon type="mdi" :path="icons.mdiUnfoldMoreHorizontal"></svg-icon>
                See more
            </v-btn>
            <div v-else class="text-center">
                <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </div>
        </div>
        <view-screenshot-modal />
    </v-container>
</template>
  
<script>
    import ScreenshotItem from '../components/ScreenshotItem.vue';
    import ViewScreenshotModal from '../components/ViewScreenshotModal.vue';
    import DateRangePicker from 'vue2-daterange-picker';
    import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';
    import LottieAnimation from 'lottie-web-vue';
    import SvgIcon from '@jamescoyle/vue-icon'
    import { mdiCalendarRange, mdiUnfoldMoreHorizontal } from '@mdi/js';

  export default {
    name: 'screenshots-view',
    data(){
        return {
            page: 0,
            dateRange: {
                startDate: new Date(),
                endDate: new Date()
            },
            select: ['Vuetify', 'Programming'],
            items: [
                'Programming',
                'Design',
                'Vue',
                'Vuetify',
            ],
            date_filter: {},
            icons: {
                mdiCalendarRange,
                mdiUnfoldMoreHorizontal
            },
            api_url: process.env.VUE_APP_API_URL
        }
    },
    components: {
        ScreenshotItem,
        ViewScreenshotModal,
        DateRangePicker,
        LottieAnimation,
        SvgIcon
    },
    filters: {
        dateCell (value) {
            let dt = new Date(value)

            return dt.getDate()
        },
        date (val) {
            return val ? val.toLocaleString() : ''
        }
    },
    computed: {
        isSeeMoreLoading(){
            return this.$store.state.is_see_more_loading;
        },
        isFetchingLoading(){
            return this.$store.state.is_fetching_session;
        },
        sessions(){
            const sessions = this.$store.state.sessions;
            var screenshots = [];

            for (let i = 0; i < sessions.length; i++) {
                for (let x = 0; x < sessions[i].logs.length; x++) {
                    var log =  sessions[i].logs[x];

                    log['username'] = sessions[i].username;
                    log['id'] = sessions[i]._id+''+x;
                    screenshots.push(log);
                }
            }
            
            return screenshots;
        },
    },
    methods: {
        fetchSession(is_from_see_more){
            this.page++;
            this.$store.dispatch('fetchSession', {
                page: this.page,
                per_page: 40,
                is_from_see_more,
                query: this.date_filter
            });
        },
        dateFormat (classes, date) {
            if (!classes.disabled) {
            classes.disabled = date.getTime() < new Date()
            }
            return classes
        },
        dateFilterChange(val){
            const filter_date_start = ((val.startDate.getMonth() > 8) ? (val.startDate.getMonth() + 1) : ('0' + (val.startDate.getMonth() + 1))) + '/' + ((val.startDate.getDate() > 9) ? val.startDate.getDate() : ('0' + val.startDate.getDate())) + '/' + val.startDate.getFullYear();
            const filter_date_end = ((val.endDate.getMonth() > 8) ? (val.endDate.getMonth() + 1) : ('0' + (val.endDate.getMonth() + 1))) + '/' + ((val.endDate.getDate() > 9) ? val.endDate.getDate() : ('0' + val.endDate.getDate())) + '/' + val.endDate.getFullYear();

            //save filter
            this.date_filter = {
                start_date: filter_date_start,
                end_date: filter_date_end
            };

            this.$store.dispatch('fetchSession', {
                page: this.page,
                per_page: 40,
                is_from_see_more: true,
                query: this.date_filter
            });
        }
    },
    created(){
        this.fetchSession(false);
    }
  }
  </script>
<style lang="scss">
    .vue-daterange-picker {
        width: 100%;
    }

    .reportrange-text {
        border-radius: 4px;
    }
</style>
