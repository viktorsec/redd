import React from 'react'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import styled from 'styled-components'
import { compose, withHandlers, withStateHandlers } from 'recompose'
import { inject, observer } from 'mobx-react'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';
import SortRedditButton from './SortRedditButton'
import UserMenuButton from './UserMenuButton'
import Grid from 'material-ui/Grid'

const enhance = compose(
    inject('viewStore'),
    inject('subredditStore'),
    withHandlers({
        handleLogin: props => () => {
            console.log(props)
            props.viewStore.performLogin()
        },
    }),
    observer,
)

const Title = styled(Typography) `
    width: 240px;
`
const SubredditTitle = styled(Typography) `
    margin-right: 16px !important;
`
const Left = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`
const Center = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`
const Right = styled.div`
    display: flex;
    justify-content: flex-end;
`
export default enhance((props) => (
    <AppBar color="primary">
        <Toolbar>
            <Grid container spacing={16}>
                <Grid item md={3}>
                    <Left>
                        <Title type="title" color="inherit" >
                            Redd
                        </Title>
                    </Left>
                </Grid>
                <Grid item md={4}>
                    <Center>
                        <SubredditTitle type="title" color="inherit" >
                            {props.subredditStore.subreddit ? `/r/${props.subredditStore.subreddit}` : 'Front Page'}
                        </SubredditTitle>
                        <SortRedditButton />
                    </Center>
                </Grid>
                <Grid item md={5}>
                    <Right>
                        {
                            props.viewStore.currentUser
                                ? <UserMenuButton />
                                : <Button color="contrast" onClick={props.handleLogin}>Login</Button>
                        }
                    </Right>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
))