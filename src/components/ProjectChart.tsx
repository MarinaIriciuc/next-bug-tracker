"use client"
// @ts-ignore
import {PieChart, ColumnChart, AreaChart} from 'react-chartkick'
import 'chartkick/chart.js'
import * as React from "react"

export default function ProjectChart({
                                       numberOfProjectsByLowPriority,
                                       numberOfProjectsByMediumPriority,
                                       numberOfProjectsByHighPriority,
                                       projectsCountPerMonth,
                                       bugsCountPerMonth,
                                       numberOfBugsToDo,
                                       numberOfBugsInProgress,
                                       numberOfBugsDone
                                     }: {
  numberOfProjectsByLowPriority: any,
  numberOfProjectsByMediumPriority: any,
  numberOfProjectsByHighPriority: any,
  projectsCountPerMonth: any,
  bugsCountPerMonth: any,
  numberOfBugsToDo: any,
  numberOfBugsInProgress: any,
  numberOfBugsDone: any
}) {


  const projectsData = Object.entries(projectsCountPerMonth).map(([month, count]) => [month, count]);
  const bugsData = Object.entries(bugsCountPerMonth).map(([month, count]) => [month, count]);

  return (
    <>
      <div className="flex lg:flex-row flex-col justify-between lg:gap-y-0 gap-y-10">
        <div>
          <p className="text-[14px] text-gray-700 dark:text-gray-300">Distribution of bugs by status:</p>
          <PieChart
            data={[["To Do", numberOfBugsToDo], ["In progress", numberOfBugsInProgress], ["Done", numberOfBugsDone]]}/>
        </div>
        <div>
          <p className="text-[14px] text-gray-700 dark:text-gray-300">Distribution of the number of projects
            according to priority</p>
          <PieChart
            data={[["Low", numberOfProjectsByLowPriority], ["Medium", numberOfProjectsByMediumPriority], ["High", numberOfProjectsByHighPriority]]}/>
        </div>
        <div>
          <p className="text-[14px] text-gray-700 dark:text-gray-300">Total Evolution of Bugs per month:</p>
          <AreaChart data={bugsData}/>
        </div>
      </div>
      <div className="mt-20 text-[20px] tracking-wider">
        <p>The evolution of adding projects every month this year</p>
        <ColumnChart data={projectsData}/>
      </div>
    </>
  )

}
