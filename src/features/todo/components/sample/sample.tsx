import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import * as ac from '../../reducer/action.creators';

export function Sample() {
    // La gestión básica de los estados en react
    // const [first, setFirst] = useState([]);
    // se sustituye por el mecanismo unidireccional proporcionado por redux
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
