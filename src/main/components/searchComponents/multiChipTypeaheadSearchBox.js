import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search"
import Select from 'react-select';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import classNames from "classnames";

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    input: {
        display: 'flex',
        padding: 0,
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    singleValue: {
        fontSize: 16,
    },
    searchIcon: {
        marginLeft: -5,
        marginRight: 0,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function NoOptionsMessage(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent(input) {
    return <div ref={input.inputRef} {...input} />;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                startAdornment:
                    <InputAdornment position="start" className={props.selectProps.classes.searchIcon}>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>,
                inputComponent,
                inputProps: Object.assign({}, props.innerProps, {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                }),
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = data => (
    <div style={groupStyles}>
        <Typography
            color="textSecondary">
            <span>{data.label}</span>
        </Typography>
        <Typography
            color="textSecondary">
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </Typography>

    </div>
);

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    ValueContainer,
};


const MultiChipTypeaheadSearchBox = props => {
    const { classes, onSelectionChange, onInputChange, suggestions, value } = props;
    return (
        <div>
            <NoSsr>
                <Select
                    classes={classes}
                    components={components}
                    textFieldProps={{
                        variant: "outlined",
                        label: "Search",
                        InputLabelProps: {
                            shrink: true,
                        },
                    }}
                    options={suggestions}
                    value={value}
                    onChange={onSelectionChange}
                    onInputChange={onInputChange}
                    placeholder="Type a song or artist"
                    isMulti
                    formatGroupLabel={formatGroupLabel}
                />
            </NoSsr>
        </div>
    )
}


export default withStyles(styles, { withTheme: true })(MultiChipTypeaheadSearchBox);

