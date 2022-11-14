import { consoleDebug } from '../../../../tools/debug';
import { useTasks } from '../../hooks/use.tasks';
import { Task } from '../../models/task';

export function TaskItem({ item }: { item: Task }) {
    const { handleDelete, handleUpdate } = useTasks();

    const handleClick = () => {
        handleDelete(item.id);
    };

    const handleChange = () => {
        consoleDebug('Handle change');
        handleUpdate({ ...item, isComplete: !item.isComplete });
    };

    return (
        <li className="">
            <input
                type="checkbox"
                checked={item.isComplete}
                onChange={handleChange}
            />
            <span>{item.id}</span>
            <span>{item.title}</span>
            <span className="button" onClick={handleClick} role="button">
                🗑️
            </span>
        </li>
    );
}
