import {createMuiTheme} from '@material-ui/core/styles'
import yellow from '@material-ui/core/colors/yellow'
import grey from '@material-ui/core/colors/grey'

const theme = createMuiTheme({
    palette:{
        primary:{
            main: yellow[500],
        },
        secondary:{
            main: grey[300]
        }
    }
})

export default theme;