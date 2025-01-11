import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { DatePickerWithRange } from './DatePicker'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import axios from 'axios'

const AddEducation = ({ onAddEducation }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const {
        register: registerEdu,
        handleSubmit: handleSubmitEdu,
        setValue: setValueEdu,
        formState: { errors }
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post("/api/educations/add-education", data);
            if (response.status === 200) {
                onAddEducation(response.data);
                setIsOpen(false);
            }
        } catch (error) {
            console.error(error)
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
                    <DialogTitle>Add Education</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col gap-3' onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitEdu(onSubmit)(e);
                }}>
                    <div className='flex items-center gap-3'>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="degree">Degree</label>
                            <Input {...registerEdu("degree")} />
                            {errors.degree && <span className="text-xs text-red-500">{errors.degree.message}</span>}
                        </div>
                        <div className='flex flex-col w-full gap-1'>
                            <label className='text-xs' htmlFor="university">University</label>
                            <Input {...registerEdu("university")} />
                            {errors.university && <span className="text-xs text-red-500">{errors.university.message}</span>}
                        </div>
                    </div>
                    <div className='flex flex-col w-full gap-1'>
                        <label className='text-xs' htmlFor="startEndDate">Start - End Date</label>
                        <DatePickerWithRange name="startEndDate" register={registerEdu} setValue={setValueEdu} />
                        {errors.startEndDate && <span className="text-xs text-red-500">{errors.startEndDate.message}</span>}
                    </div>
                    <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Adding..." : "Add"}</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddEducation