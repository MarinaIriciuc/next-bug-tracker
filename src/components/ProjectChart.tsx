"use client"
import {LineChart, PieChart, ColumnChart, BarChart, AreaChart, ScatterChart} from 'react-chartkick'
import 'chartkick/chart.js'

export default function ProjectChart({numberOfProjectsByLowPriority, numberOfProjectsByMediumPriority, numberOfProjectsByHighPriority, projectsCountPerMonth}: { numberOfProjectsByLowPriority: any, numberOfProjectsByMediumPriority: any, numberOfProjectsByHighPriority: any, projectsCountPerMonth: any }) {

    //   1. afisez nr de buguri rezolvare, in progress si to do

    const projectsData = Object.entries(projectsCountPerMonth).map(([month, count]) => [month, count]);


    return (
        <>
            <div className="flex justify-between">
                <div>
                    <p className="text-[14px] text-gray-700 dark:text-gray-300">Distribution of bugs by status:</p>
                    {/*<PieChart data={[["To Do", numberOfProjectsByHighPriority], ["In progress", numberOfProjectsByMediumPriority], ["Done", numberOfProjectsByLowPriority]]}/>*/}
                </div>
                <div>
                    <p className="text-[14px] text-gray-700 dark:text-gray-300">Distribution of the number of projects
                        according to priority</p>
                    <PieChart
                        data={[["Low", numberOfProjectsByLowPriority], ["Medium", numberOfProjectsByMediumPriority], ["High", numberOfProjectsByHighPriority]]}/>
                </div>
                <div>
                    <p className="text-[14px] text-gray-700 dark:text-gray-300">Distribution of bugs by status:</p>
                    <PieChart data={[["To Do", 44], ["In progress", 23], ["Done", 44]]}/>
                </div>
            </div>
            <div className="mt-5">
                <ColumnChart data={projectsData}/>
            </div>
        </>
    )

}
