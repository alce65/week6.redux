import { SyntheticEvent, useState } from 'react';
import { ProtoTask } from '../../models/task';
import { useTasks } from '../../hooks/use.tasks';

type formData = {
    title: string;
    responsible: string;
};
export function Add() {
    const title = 'Añadir tarea';
    const initialState: formData = {
        title: '',
        responsible: '',
    };
    const [formState, setFormState] = useState(initialState);
    const { handleAdd } = useTasks();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newTask: ProtoTask = { ...formState, isComplete: false };
        handleAdd(newTask);
    };

    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="title"
                        aria-label="Title"
                        placeholder="Cuál es la tarea"
                        value={formState.title}
                        onInput={handleInput}
                        required
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="responsible"
                        aria-label="Responsible"
                        placeholder="Quien es el responsable"
                        value={formState.responsible}
                        onInput={handleInput}
                    />
                </div>
                <button type="submit">Guardar</button>
            </form>
        </>
    );
}
