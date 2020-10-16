import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import StackEventsContext from "./StackEventsContext.js";

class StackEvents extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stack: []
        };

        this._push = this._push.bind(this);
        this._pop = this._pop.bind(this);
        this._handleEvent = this._handleEvent.bind(this);
    }

    componentDidMount() {
        const { events } = this.props;
        
        if (!document) return;

        if (events && _.isArray(events) && events.length > 0) {
            events.forEach((type) => {
                console.log("Adding event listerenr for type ", type);
                document.addEventListener(type, this._handleEvent);
            });
        }
    }

    componentWillUnmount() {
        const { events } = this.props;
        
        if (!document) return;

        if (events && _.isArray(events) && events.length > 0) {
            events.forEach((type) => {
                document.removeEventListener(type, this._handleEvent);
            });
        }
    }

    _push(evetlsHandlers) {
        const { stack } = this.state;

        if (evetlsHandlers && _.isPlainObject(evetlsHandlers) && _.size(evetlsHandlers) > 0) {
            const handlers = {};

            _.forEach(evetlsHandlers, (f, k) => {
                if (k && _.isString(k) && f && _.isFunction(f)) {
                    handlers[k] = f;
                }
            });

            if (_.size(handlers) > 0) {
                this.setState({stack: [ ...stack, evetlsHandlers]});
                return
            }
        } 

        console.error("wrong handlers object passed; (<string>: <function>) map expected;");
        console.error("handlers: ", evetlsHandlers);

        throw new Error("Wrong handlers object passed; view logs for details");        
    }

    _pop() {
        const { stack } = this.state;

        if (stack.length > 0) {
            this.setState({stack: [ ..._.take(stack, stack.length - 1) ]});
        }
    }
    
    _handleEvent(event) {
        console.log("Handle event");
        const { stack } = this.state;

        if (stack.length > 0) {
            const last = _.last(stack);
            const type = _.lowerCase(event.type);

            if (last[type] && _.isFunction(last[type])) {
                last[type](event);
            }
        }
    }

    render() {
        return (
            <StackEventsContext.Provider value={{
                "pushEvents": this._push,
                "popEvents": this._pop
            }}>
                {this.props.children}
            </StackEventsContext.Provider>
        );
    }
}

StackEvents.protoTypes = {
    events: PropTypes.arrayOf(PropTypes.string)
}

export default StackEvents;