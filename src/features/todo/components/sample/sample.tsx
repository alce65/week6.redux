import { useTasks } from '../../hooks/use.tasks';

export function Sample() {
    const { tasks } = useTasks();

    return (
        <>
            <h2>Sample Task List</h2>
            {tasks.map((item) => (
                <p key={item.id}>{item.title}</p>
            ))}
        </>
    );
}
