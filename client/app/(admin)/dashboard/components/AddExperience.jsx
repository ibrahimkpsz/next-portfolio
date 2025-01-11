import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { DatePickerWithRange } from './DatePicker'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const AddExperience = ({ onAddExperience }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/experiences/add-experience", data);
            if (response.status === 200) {
                onAddExperience(response.data);
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
                    <DialogTitle>Add Experience</DialogTitle>
                </DialogHeader>
                <form key={2} className='flex flex-col gap-3' onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(onSubmit)(e);
                }}>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="position">Position</label>
                            <Input {...register("position")} />
                            {errors.position && <span className="text-xs text-red-500">{errors.position.message}</span>}
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="company">Company</label>
                            <Input {...register("company")} />
                            {errors.company && <span className="text-xs text-red-500">{errors.company.message}</span>}
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label className='text-xs' htmlFor="startEndDate">Start - End Date</label>
                        <DatePickerWithRange name="startEndDate" register={register} setValue={setValue} />
                        {errors.startEndDate && <span className="text-xs text-red-500">{errors.startEndDate.message}</span>}
                    </div>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddExperience