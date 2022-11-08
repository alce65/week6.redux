import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import * as ac from '../../reducer/action.creators';

export function Sample() {
    // const [first, setfirst] = useState([]);
    const tasks = useSelector((state: rootState) => state.tasks);
    const dispatcher = useDispatch();

    useEffect(() => {
        dispatcher(
            ac.loadActionCreator([
                {
                    id: '1',
                    title: 'Terminar redux',
                    responsible: 'Pepe',
                    isComplete: false,
                },
            ])
        );
    }, [dispatcher]);

    return (
        <>
            {tasks.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </>
    );
}
