import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import styled from 'styled-components'
import { compose, withHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import ViewStore from '../store/ViewStore'

const enhance = compose(
    inject('viewStore'),
    withHandlers({
        handleLogin: props => () => {
            console.log(props)
            props.viewStore.performLogin()
        },
    }),
    observer,
)

const Title = styled(Typography) `
    flex: 1;
`

export default enhance((props) => (
    <AppBar color="primary">
        <Toolbar>
            <Title type="title" color="inherit" >
                Redd
            </Title>
            {
                props.viewStore.currentUser
                    ? <div>{props.viewStore.currentUser.name}</div>
                    : <Button color="contrast" onClick={props.handleLogin}>Login</Button>
            }
        </Toolbar>
    </AppBar>
))