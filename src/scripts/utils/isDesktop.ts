import isMobile from './isMobile';
import { mqIsDesktop } from './mediaQueryEvent';

export default () => !isMobile() && mqIsDesktop;
