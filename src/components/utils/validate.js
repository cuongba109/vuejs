//check string
import str_re from '../constants/regex';
function checkString(str) {
    var check = str_re.test(str);
    return check;
}
export default checkString;
