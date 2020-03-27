import 'webpack'
import { Configuration } from 'webpack'

declare namespace webpack {
    interface OutputConfiguration {
        [key: string]: Configuration
    }
}