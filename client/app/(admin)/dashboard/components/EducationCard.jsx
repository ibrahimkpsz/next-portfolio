import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { MoreVerticalIcon } from 'lucide-react'
import React from 'react'
import { FaGraduationCap } from 'react-icons/fa'

const EducationCard = ({ educations, toast, onDeleteEducation }) => {
    const handleDelete = async (id) => {
        const deletedEducation = await axios.post("/api/educations/delete-education", { id });
        onDeleteEducation(deletedEducation);
        if (deletedEducation) {
            toast({
                description: "Education has been successfully deleted.",
                duration: 5000
            });
        }
    }
    return (
        <div className="grid grid-cols-1 gap-2 xl:grid-cols-2">
            {educations.map((education) => (
                <div key={education._id} className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                        <div className="p-3 border rounded-full">
                            <FaGraduationCap className="mx-auto" />
                        </div>
                        <div className="flex flex-col">
                            <div className="text-sm font-semibold">{education.degree}</div>
                            <div className="text-xs">{education.university}</div>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <MoreVerticalIcon size={16} />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleDelete(education._id)}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ))}
        </div>
    )
}

export default EducationCard