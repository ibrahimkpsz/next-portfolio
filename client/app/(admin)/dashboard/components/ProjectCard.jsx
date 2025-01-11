import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { MoreVerticalIcon } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import { FaBolt } from 'react-icons/fa'

const formatDate = (dateString) => {
    return moment(dateString).locale('en').format('LL');
};

const ProjectCard = ({ projects, toast, onDeleteProject }) => {
    const handleDelete = async (id) => {
        const deletedProject = await axios.post("/api/projects/delete-project", { id });
        onDeleteProject(deletedProject);
        if (deletedProject) {
            toast({
                description: "Project has been successfully deleted.",
                duration: 5000
            });
        }
    }
    return (
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            {projects.map((project) => (
                <div key={project._id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="p-3 border rounded-full">
                            <FaBolt className="mx-auto" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-semibold">{project.name}</div>
                            <div className="text-xs">{formatDate(project.createdAt)}</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVerticalIcon size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDelete(project._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </div>
    )
}

export default ProjectCard