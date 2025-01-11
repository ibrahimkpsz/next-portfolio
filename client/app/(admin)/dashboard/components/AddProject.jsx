import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'

const AddProject = ({ onAddProject }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('date', data.date);
            formData.append('website', data.website);
            formData.append('github', data.github);

            if (data.photo[0]) {
                formData.append('photo', data.photo[0]);
            }

            const response = await axios.post("/api/projects/add-project", formData);
            if (response.status === 200) {
                onAddProject(response.data);
                setIsOpen(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger className='p-1 border rounded cursor-pointer' asChild>
                <Plus size={20} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="pb-2">
                    <DialogTitle>Add Project</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col w-full gap-1'>
                        <label className='text-xs' htmlFor="photo">Project Photo</label>
                        <Input
                            type="file"
                            {...register("photo", { required: "File is required" })}
                        />
                        {errors.photo && <span className="text-xs text-red-500">{errors.photo.message}</span>}
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label className='text-xs' htmlFor="name">Name</label>
                        <Input
                            {...register("name", { required: "Project name is required" })}
                        />
                        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label className='text-xs' htmlFor="description">Description</label>
                        <Textarea
                            {...register("description", { required: "Description is required" })}
                        />
                        {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="website">Website</label>
                            <Input {...register("website", { required: "Website URL is required" })} />
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="github">Github</label>
                            <Input {...register("github", { required: "Github URL is required" })} />
                        </div>
                    </div>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddProject;
