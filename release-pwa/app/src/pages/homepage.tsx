import Vue, { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import { State, Action } from 'vuex-class'
import { VCmsBanner } from '@components/common'

@Component({
    name: 'v-homepage',
    head: {
        title: {
            inner: 'PWA',
            complement: 'Homepage'
        }
    },
    components: {
        VCmsBanner
    }
})
export default class VHomePage extends Vue {
    private name: string = ''
    private method: number = 0
    private checkbox: string = 'Yes'
    private switch: string = 'On'
    public star: number = 5

    @State('cmsBanner') cmsBanner: any
    @Action('getBanner') getBanner: any

    public mounted () {
        this.getBanner()
    }
    
    protected render (h: CreateElement) {
        return (
            <div class="v-homepage">
                <div class="container">
                    <h1>Silk SPA - Headless Magento</h1>
                    {this.cmsBanner.length > 0 && (
                        <div class="v-row">
                            <v-cms-banner carousels={this.cmsBanner}></v-cms-banner>
                        </div>
                    )}
                    <div class="v-row">
                        <v-input vModel={this.name} password-reveal={true}></v-input>
                    </div>
                    <div class="v-row">
                        <v-radio name="name" vModel={this.method} native-value={0}></v-radio>
                        <v-radio name="name" vModel={this.method} native-value={1}></v-radio>
                    </div>
                    <div class="v-row">
                        <v-checkbox name="checkbox" vModel={this.checkbox} true-value={'Yes'} false-value={'No'}>{this.checkbox}</v-checkbox>
                    </div>
                    <div class="v-row">
                        <v-switch name="switch" vModel={this.switch} true-value={'On'} false-value={'Off'}>{this.switch}</v-switch>
                    </div>
                    <div class="v-row">
                        <v-rate vModel={this.star} showScore={true}></v-rate>
                    </div>
                    <div class="v-row">
                        
                    </div>
                    <div class="v-row">
                        <v-progress value={60} show-value={true} format="percent"></v-progress>
                    </div>
                </div>
            </div>
        )
    }
}