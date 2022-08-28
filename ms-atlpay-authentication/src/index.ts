import {app} from '../config/app';
import {nodeScheduler} from '../config/nodeScheduler';
nodeScheduler.schedule();
app.listen();
