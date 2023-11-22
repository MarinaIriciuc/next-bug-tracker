"use client"
import {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

// DnD
import {
    DndContext,
    DragEndEvent,
    DragMoveEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    UniqueIdentifier,
    closestCorners,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import {Inter} from 'next/font/google';

// Components
import Container from "@/components/Kanbanasd/Container/Container";
import Items from "@/components/Kanbanasd/Item/Item";
import Modal from "@/components/Kanbanasd/Modal/Modal";
import Input from "@/components/Kanbanasd/Input/Input";
import {Button} from "@/components/Kanbanasd/Button/Button";
import BugModal from "@/components/Bugs/BugModal/BugModal";

const inter = Inter({subsets: ['latin']});

type DNDType = {
    id: UniqueIdentifier;
    title: string;
    items: {
        id: UniqueIdentifier;
        title: string;
    }[];
};

export default function ProjectId({params}: { params: any }) {

    // const tasks = await getTasks(params.id)


    const [containers, setContainers] = useState<DNDType[]>([]);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
    const [currentContainerId, setCurrentContainerId] = useState<UniqueIdentifier>();
    const [containerName, setContainerName] = useState('');
    const [itemName, setItemName] = useState('');
    const [showAddContainerModal, setShowAddContainerModal] = useState(false);
    const [showAddItemModal, setShowAddItemModal] = useState(false);


    function onAddContainer() {
        if (!containerName) return;
        const id = `container-${uuidv4()}`;
        setContainers([
            ...containers,
            {
                id,
                title: containerName,
                items: [],
            },
        ]);
        setContainerName('');
        setShowAddContainerModal(false);
    };

    function onAddItem(){
        if (!itemName) return;
        const id = `item-${uuidv4()}`;
        const container = containers.find((item) => item.id === currentContainerId);
        if (!container) return;
        container.items.push({
            id,
            title: itemName,
        });
        setContainers([...containers]);
        setItemName('');
        setShowAddItemModal(false);
    };

    function findValueOfItems(id: UniqueIdentifier | undefined, type: string) {
        if (type === 'container') {
            return containers.find((item) => item.id === id);
        }
        if (type === 'item') {
            return containers.find((container) =>
                container.items.find((item) => item.id === id),
            );
        }
    }

    function findItemTitle (id: UniqueIdentifier | undefined) {
        const container = findValueOfItems(id, 'item');
        if (!container) return '';
        const item = container.items.find((item) => item.id === id);
        if (!item) return '';
        return item.title;
    };

    function findContainerTitle  (id: UniqueIdentifier | undefined)  {
        const container = findValueOfItems(id, 'container');
        if (!container) return '';
        return container.title;
    };

    const findContainerItems = (id: UniqueIdentifier | undefined) => {
        const container = findValueOfItems(id, 'container');
        if (!container) return [];
        return container.items;
    };

    const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
    }),);

    function handleDragStart(event: DragStartEvent) {
        const {active} = event;
        const {id} = active;
        setActiveId(id);
    }

    function handleDragMove  (event: DragMoveEvent)  {
        const {active, over} = event;

        // Handle Items Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active container and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );
            const overitemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id,
            );
            // In the same container
            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeitemIndex,
                    overitemIndex,
                );

                setContainers(newItems);
            } else {
                // In different containers
                let newItems = [...containers];
                const [removeditem] = newItems[activeContainerIndex].items.splice(
                    activeitemIndex,
                    1,
                );
                newItems[overContainerIndex].items.splice(
                    overitemIndex,
                    0,
                    removeditem,
                );
                setContainers(newItems);
            }
        }

        // Handling Item Drop Into a Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;

            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );

            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );

            // Remove the active item from the active container and add it to the over container
            let newItems = [...containers];
            const [removeditem] = newItems[activeContainerIndex].items.splice(
                activeitemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removeditem);
            setContainers(newItems);
        }
    };

    // This is the function that handles the sorting of the containers and items when the user is done dragging.
    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        // Handling Container Sorting
        if (
            active.id.toString().includes('container') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === active.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === over.id,
            );
            // Swap the active and over container
            let newItems = [...containers];
            newItems = arrayMove(newItems, activeContainerIndex, overContainerIndex);
            setContainers(newItems);
        }

        // Handling item Sorting
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('item') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'item');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );
            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );
            const overitemIndex = overContainer.items.findIndex(
                (item) => item.id === over.id,
            );

            // In the same container
            if (activeContainerIndex === overContainerIndex) {
                let newItems = [...containers];
                newItems[activeContainerIndex].items = arrayMove(
                    newItems[activeContainerIndex].items,
                    activeitemIndex,
                    overitemIndex,
                );
                setContainers(newItems);
            } else {
                // In different containers
                let newItems = [...containers];
                const [removeditem] = newItems[activeContainerIndex].items.splice(
                    activeitemIndex,
                    1,
                );
                newItems[overContainerIndex].items.splice(
                    overitemIndex,
                    0,
                    removeditem,
                );
                setContainers(newItems);
            }
        }
        // Handling item dropping into Container
        if (
            active.id.toString().includes('item') &&
            over?.id.toString().includes('container') &&
            active &&
            over &&
            active.id !== over.id
        ) {
            // Find the active and over container
            const activeContainer = findValueOfItems(active.id, 'item');
            const overContainer = findValueOfItems(over.id, 'container');

            // If the active or over container is not found, return
            if (!activeContainer || !overContainer) return;
            // Find the index of the active and over container
            const activeContainerIndex = containers.findIndex(
                (container) => container.id === activeContainer.id,
            );
            const overContainerIndex = containers.findIndex(
                (container) => container.id === overContainer.id,
            );
            // Find the index of the active and over item
            const activeitemIndex = activeContainer.items.findIndex(
                (item) => item.id === active.id,
            );

            let newItems = [...containers];
            const [removeditem] = newItems[activeContainerIndex].items.splice(
                activeitemIndex,
                1,
            );
            newItems[overContainerIndex].items.push(removeditem);
            setContainers(newItems);
        }
        setActiveId(null);
    }

    return (
        <>
            {/*<BugModal buttonName="Add a bug" title="Add a bug"/>*/}
            {/*<div className="mt-12">*/}
            {/*    {tasks.map(function (task) {*/}
            {/*        return (*/}
            {/*            <>*/}
            {/*                <Popover>*/}
            {/*                    <PopoverTrigger>*/}
            {/*                        <BugCard task={task} key={task.id}/>*/}
            {/*                    </PopoverTrigger>*/}
            {/*                    <PopoverContent side="right" className="border-2 border-gray-200 shadow-xl bg-gray-100">*/}
            {/*                        <div>*/}
            {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Description</p>*/}
            {/*                            <p className="text-[13px]">{task.description}</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex items-center mt-5 gap-3">*/}
            {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Priority</p>*/}
            {/*                            <p className={`${task.priority === "low" ? "bg-green-500" :*/}
            {/*                                task.priority === "medium" ? "bg-yellow-400" :*/}
            {/*                                    "bg-red-400"} text-white rounded uppercase text-[14px] w-20 flex justify-center`}>{task.priority}</p>*/}
            {/*                        </div>*/}
            {/*                        <div className="flex items-center gap-3 mt-5">*/}
            {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Members*/}
            {/*                                (3):</p>*/}
            {/*                            <UserAvatar/>*/}
            {/*                            <UserAvatar/>*/}
            {/*                        </div>*/}
            {/*                        <div className="mt-5 flex items-center gap-3">*/}
            {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">Deadline</p>*/}
            {/*                            <p className="text-gray-600 text-[12px] tracking-wide uppercase">15.05.2023</p>*/}
            {/*                        </div>*/}
            {/*                    </PopoverContent>*/}
            {/*                </Popover>*/}
            {/*            </>*/}
            {/*        )*/}
            {/*    })}*/}

            {/*</div>*/}





            <BugModal buttonName="Add a bug" title="Add a bug"/>
            <div className="mx-auto max-w-7xl py-10 border-2 border-black">
                <Modal showModal={showAddContainerModal} setShowModal={setShowAddContainerModal}>
                    <div className="flex flex-col w-full items-start gap-y-4">
                        <h1 className="text-gray-800 text-3xl font-bold">Add Container</h1>
                        <Input
                            type="text"
                            placeholder="Container Title"
                            name="containername"
                            value={containerName}
                            onChange={(e) => setContainerName(e.target.value)}
                        />
                        <Button onClick={onAddContainer}>Add container</Button>
                    </div>
                </Modal>
                <Modal showModal={showAddItemModal} setShowModal={setShowAddItemModal}>
                    <div className="flex flex-col w-full items-start gap-y-4">
                        <h1 className="text-gray-800 text-3xl font-bold">Add Item</h1>
                        <Input
                            type="text"
                            placeholder="Item Title"
                            name="itemname"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                        <Button onClick={onAddItem}>Add Item</Button>
                    </div>
                </Modal>




                <div className="flex items-center justify-between gap-y-2">
                    <h1 className="text-gray-800 text-3xl font-bold">Kanban Board</h1>
                    <Button onClick={() => setShowAddContainerModal(true)}>
                        Add Container
                    </Button>
                </div>
                <div className="mt-10 bg-pink-300">
                    <div className="grid grid-cols-3 gap-6">
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCorners}
                            onDragStart={handleDragStart}
                            onDragMove={handleDragMove}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={containers.map((i) => i.id)}>
                                {containers.map((container) => (
                                    <Container
                                        id={container.id}
                                        title={container.title}
                                        key={container.id}
                                        onAddItem={() => {
                                            setShowAddItemModal(true);
                                            setCurrentContainerId(container.id);
                                        }}
                                    >
                                        <SortableContext items={container.items.map((i) => i.id)}>
                                            <div className="flex items-start flex-col gap-y-4">
                                                {container.items.map((i) => (
                                                    <Items title={i.title} id={i.id} key={i.id}/>
                                                ))}
                                            </div>
                                        </SortableContext>
                                    </Container>
                                ))}
                            </SortableContext>
                            <DragOverlay adjustScale={false}>
                                {activeId && activeId.toString().includes('item') && (
                                    <Items id={activeId} title={findItemTitle(activeId)}/>
                                )}
                                {activeId && activeId.toString().includes('container') && (
                                    <Container id={activeId} title={findContainerTitle(activeId)}>
                                        {findContainerItems(activeId).map((i) => (
                                            <Items key={i.id} title={i.title} id={i.id}/>
                                        ))}
                                    </Container>
                                )}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>
            </div>



        </>
    )

}

