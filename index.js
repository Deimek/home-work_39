import React, { useEffect } from "react";
import ReactDOM from 'react-dom/client';
import { Provider, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";



const root = ReactDOM.createRoot(document.getElementById('root'));

const state = {
    result: 0,
}

const createSetResult = (number) => {
    return { type: 'SET_RESULT', payload: number }
};

const createSetReset = () => {
    return { type: 'RESET', payload: 0 }
};

const reducer = (prevState, action) => {
    if (action.type === 'SET_RESULT') {

        return { ...prevState, result: action.payload }
    }
    else if (action.type === 'RESET') {
        return { ...prevState, result: action.payload }
    }
    return prevState;
};

const store = createStore(reducer, state);

store.subscribe(() => {
    console.log(store.getState());
});

// const action = createSetResult();
// store.dispatch(action);


//-----------------------------------------------------------------------------------



const Index = () => {

    //const [result, setResult] = useState(0);
    const result = useSelector(state => state.result);
    const dispatch = useDispatch();

    useEffect(() => {
        const newResult = localStorage.getItem('store');
        if (newResult) {
            const parseNewResalt = JSON.parse(newResult);
            dispatch(createSetResult(parseNewResalt.result));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('store', JSON.stringify({ result }));
    }, [result]);

    const plus = () => {
        //setResult(result + 1);
        const newResult = createSetResult(result + 1);
        dispatch(newResult);
    }

    const minus = () => {
        //setResult(result - 1);
        const newResult = createSetResult(result - 1);
        dispatch(newResult);
    }

    const reset = () => {
        dispatch(createSetReset());
    }

    return (
        <div>
            <h2>Couner '+' - '-'</h2>
            <div>
                <span>{result}</span>
            </div>
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>
            <button onClick={reset}>Reset</button>
        </div>
    )

}


root.render(<Provider store={store}>
    <Index />
</Provider>)