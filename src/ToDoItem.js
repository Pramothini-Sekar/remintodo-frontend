import * as React from 'react';
import dateFormat from 'dateformat';
import ListItem from '@mui/material/ListItem';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import { withRouter } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Steps } from 'intro.js-react';
import "intro.js/introjs.css";
import './ToDo.css';

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

class ToDoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            title: '',
            expanded: false
        }

        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExpandClick() {
        const currentExpanded = this.state.expanded;
        this.setState({
            ...this.state,
            expanded: !currentExpanded
        });
    }

    render() {
        let item = this.props.value;
        let { expanded } = this.state;
        return (
            <div className="todoitem">
                <ListItem
                    key={item.id}
                    disablePadding
                >
                    <Card sx={{ width: 345 }} id={item.id}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="task">
                                    {item.title.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            }
                            title={item.title}
                            subheader={dateFormat(item.deadline, "dddd, mmmm dS, yyyy")}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Category
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton edge="end" aria-label="edit" onClick={() => this.props.updateTodoItem(item)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" onClick={() => this.props.deleteTodo(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                            {(item.description || item.status) && <ExpandMore
                                expand={expanded}
                                onClick={this.handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </ExpandMore>}
                        </CardActions>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <CardContent>
                                {item.description && <Typography paragraph>Description:</Typography>}
                                <Typography paragraph>
                                    {item.description}
                                </Typography>
                                {item.status && <Typography paragraph>Status:</Typography>}
                                <Typography paragraph>
                                    {item.status}
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </ListItem>
            </div>

        );
    }
}

export default withRouter(ToDoItem);