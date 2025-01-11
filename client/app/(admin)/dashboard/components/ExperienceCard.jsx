import axios from 'axios'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVerticalIcon } from 'lucide-react'
import { MdWork } from 'react-icons/md'

const ExperienceCard = ({ experiences, toast, onDeleteExperience }) => {
    const handleDelete = async (id) => {
        const deletedExperience = await axios.post("/api/experiences/delete-experience", { id });
        onDeleteExperience(deletedExperience);
        if (deletedExperience) {
            toast({
                description: "Experience has been successfully deleted.",
                duration: 5000
            });
        }
    }
    return (
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            {experiences.map((experience) => (
                <div key={experience._id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="p-3 border rounded-full">
                            <MdWork className="mx-auto" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-semibold">{experience.position}</div>
                            <div className="text-xs">{experience.company}</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVerticalIcon size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDelete(experience._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </div>
    )
}

export default ExperienceCard