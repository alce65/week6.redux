import { useEffect } from 'react';
import { useTasks } from '../../hooks/use.tasks';
import { Task } from '../../models/task';
import { Add } from '../add/add';
import { TaskItem } from '../task.item/task.item';
import './task.list.css';

export function TaskList() {
    const title = 'Tareas';
    const { tasks, handleLoad } = useTasks();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section>
            <h2>{title}</h2>
            <Add></Add>
            <ul className="task_list">
                {tasks.map((item: Task) => (
                    <TaskItem key={item.id} item={item}></TaskItem>
                ))}
            </ul>
        </section>
    );
}
