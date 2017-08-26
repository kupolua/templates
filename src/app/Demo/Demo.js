import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {List, ListItem} from 'material-ui/List';

import { initial } from '../actions/initial';
import { setJsonPath } from '../actions/setJsonPath';
import { setHook } from '../actions/setHook';
import { logger } from '../actions/logger';
import { setLoggerUrl } from '../actions/setLoggerUrl';

const styles = {
    root: {
        // display: 'flex',
        color: 'green',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
};

let Logger = (function logInfo() {
    let loggerReducer;

    function _log(level, args) {
        if(!loggerReducer) {return}
        // console.log('Logger::log(loggerReducer)', loggerReducer)
        console.log('Logger::log(level, args)', level, args)
        loggerReducer({
            message: {
                level: level, //todo: replace with switch case
                log: Array.prototype.slice.call(args, 0)
            }
        })
    };

    return {
        setReducer: (reducer) => {
            loggerReducer = reducer;
        },
        info: function () {
            _log('info', arguments)
        },
        debug: function () {
            _log('debug', arguments)
        },
        warn: function () {
            _log('warn', arguments)
        },
        error: function () {
            _log('error', arguments)
        }
    }
})();

class Demo extends Component {
    constructor(props, context) {
        super(props, context);

        this.props.setLoggerUrl(props.loggerUrl);

        Logger.setReducer(this.props.logger);
        Logger.info('Demo app running...');
        Logger.debug('class Demo::constructor(props, context)', props, context);


        this.props.setJsonPath(props.jsonPath);
        this.props.initial(props.dataUrl);

        this.state = {
            data: [],
            hookFunction: props.dataHook
        };
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.data.data) {return}

        Logger.debug('class Demo::componentWillReceiveProps', nextProps);

        this.setState({
            data: nextProps.data.data
        });
    }

    setHook(event) {
        let hookData = {
            hookFunction: this.state.hookFunction,
            hookData: event.currentTarget.textContent
        };

        this.props.setHook(hookData);

        Logger.debug('class Demo::setHook()', hookData)
    }

    render() {
        if(!this.props.data.data) {return <div>Loading ...</div>}

        Logger.debug('class Demo::render()', this.state);

        return (
            <div style={styles.root}>
                <div>Used libraries:</div>
                <List>
                    {this.state.data.map((row) => {
                        return (<ListItem
                            key={row.id}
                            onClick={event => this.setHook(event)}
                            primaryText={row.title}
                        />)
                    })}
                </List>
            </div>
        );
    }
}

function mapStateToProps({data}) {
    return { data };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        initial,
        setJsonPath,
        setHook,
        setLoggerUrl,
        logger
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo);