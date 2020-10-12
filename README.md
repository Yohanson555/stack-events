### Overview

`stack-events` is a simple JavaScript module for implementing state machine arcitecture of component event handling

### Installation

`npm install stack-events --save`

### Usage

1. You need to wrap your application with `<StackEvents />` with `events` prop passed to it; `events` - is an array of string keys. Each key is a supported DOM event name that `StackEvents` should handle on. If no `events` wass passed in the component will not handle any events at all. 

```javascript
    ...
        return (
            <EventStack events={["keydown", "mousedown"]}>
                {this.props.child}
            </EventStack>
        );
    ...
```

You can use string keys or constans from `stack-events/const` list; The list of available methods constans are below in this `readme` file

2. In the child component you shoul call `withStackEvents` HOC for you component. 

```javascript
    import React from 'react';
    import { withEventStack } from '../component';

    ...

    class MyComponent extends React.Component {
        ...
    }

    ...

    export default withEventStack(MyComponent);
```

After HOC your componen will receive two methods: `pushEvents` and `popEvents`. 

3. Use `pushEvents` into component's `componentDidMount` life method to push your component event handlers to `stackEvents` stack; 

```javascript
    ...

    componentDidMount() {
        this.props.pushEvents({
            "keydown": this.handleKeyDown,
            "keyup": this.handleKeyUp
        })
    }
    
    ...
```

4. Don't forget to use `popEvents` in component's `componentWillUnmount` method to pop events from the stack.

```javascript
    ...

    componentWillUnmount() {
        this.props.popEvents();
    }
    
    ...
```


### Events constants

- ABORT
- ANIMATIONEND
- ANIMATIONITERATION
- ANIMATIONSTART
- BLUR
- CANPLAY
- CANPLAYTHROUGH
- CHANGE
- CLICK
- CONTEXTMENU
- COPY
- CUT
- DBLCLICK
- DRAG
- DRAGEND
- DRAGENTER
- DRAGEXIT
- DRAGLEAVE
- DRAGOVER
- DRAGSTART
- DROP
- DURATIONCHANGE
- EMPTIED
- ENCRYPTED
- ENDED
- ERROR
- FOCUS
- FOCUSIN
- FOCUSOUT
- HASHCHANGE
- INPUT
- INVALID
- KEYDOWN
- KEYPRESS
- KEYUP
- LOAD
- LOADEDDATA
- LOADEDMETADATA
- LOADSTART
- MOUSEDOWN
- MOUSEENTER
- MOUSELEAVE
- MOUSEMOVE
- MOUSEOUT
- MOUSEOVER
- MOUSEUP
- PASTE
- PAUSE
- PLAY
- PLAYING
- POPSTATE
- PROGRESS
- RATECHANGE
- RESET
- RESIZE
- SCROLL
- SEEKED
- SEEKING
- SELECT
- STALLED
- SUBMIT
- SUSPEND
- TIMEUPDATE
- TOUCHCANCEL
- TOUCHEND
- TOUCHMOVE
- TOUCHSTART
- TRANSITIONEND
- UNLOAD
- VOLUMECHANGE
- WAITING
- WHEEL