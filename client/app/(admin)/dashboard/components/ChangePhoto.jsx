import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { FaUpload } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import axios from 'axios'

const ChangePhoto = ({ onChangePhoto }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            if (data.photo[0]) {
                formData.append('photo', data.photo[0]);
            }
            console.log(formData)
            const response = await axios.post(`/api/user/photo`, formData);
            if (response.status === 200) {
                onChangePhoto();
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
            <DialogTrigger asChild>
                <Button size="icon" variant="link">
                    <FaUpload className='text-white' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Profile Photo</DialogTitle>
                    <DialogDescription>Upload your photo in supported format. {"(.jpg, .jpeg, .png)"}</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-full gap-1">
                        <label className="text-xs" htmlFor="photo">Photo</label>
                        <Input {...register("photo")} type="file" accept=".jpg, .jpeg, .png" required />
                    </div>
                    <Button className="w-full mt-3" type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save"}</Button>
                </form>
            </DialogContent>
        </Dialog>

    )
}

export default ChangePhoto