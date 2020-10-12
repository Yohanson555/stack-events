import React from 'react';
import { withStackEvents } from 'stack-events';

import Component from './MyComponent';

class MyComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            deployed: false
        };

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.deploy = this.deploy.bind(this);
        this.destroy = this.destroy.bind(this);
    }

    componentDidMount() {
        this.setState({name: "Componentos #" + this.props.index});

        this.props.pushEvents({
            "keydown": this.handleKeyDown,
            "keyup": this.handleKeyUp
        })
    }

    componentWillUnmount() {
        this.props.popEvents();
    }

    handleKeyDown() {
        const { name } = this.state;

        console.log(`"keydown" event handled by component "${name}"`);
    }

    handleKeyUp() {
        const { name } = this.state;

        console.log(`"keyup" event handled by component "${name}"`);
    }

    deploy() {
        const { name } = this.state;

        console.log("Deploy in ", name);
        this.setState({ deployed: true });
    }

    destroy() {
        const { name } = this.state;
        
        console.log("Destroy in ", name);
        this.setState({ deployed: false });
    }

    render() {
        const { index } = this.props;
        const { deployed, name } = this.state;

        return (
            <div className="componentos">
                <div className="componentos-name">{`Hi! I am ${name}`}</div>

                <div className="componentos-body">
                    {deployed ? (<Component index={index+1} />) : null}
                </div>

                <div className="componentos-buttons">
                    {
                        deployed ?
                            (<button onClick={this.destroy}>Destroy</button>) :
                            (<button onClick={this.deploy}>Deploy</button>)
                    }
                </div>
            </div>
        );
    }
}

export default withStackEvents(MyComponent);