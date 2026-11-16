"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field"
import { Input } from "../ui/input"
import { InputGroup, InputGroupTextarea } from "../ui/input-group"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Image from "next/image";
import { PostDetails } from "./PostDetailsCard"
import { CheckCircle2Icon, UploadIcon } from "lucide-react"
import { useActionState, useState } from "react"
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../ui/alert-dialog"
import { useRouter, redirect } from "next/navigation";
import { FormState } from "./CreatePostForm"
import { updatePost } from "@/app/actions/post.action"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { formatDate } from "@/lib/shared/utils"

const species = [
    { label: "Cat", value: "Cat" },
    { label: "Dog", value: "Dog" },
    { label: "Bird", value: "Bird" },
    { label: "Other", value: "Other" },
]

const sex = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Unknown", value: "Unknown" },
]

const status = [
    { label: "Lost", value: "Lost" },
    { label: "Reunited", value: "Reunited" },
]

const states = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" },
]

type EditPostFormState = FormState & {
    success: boolean,
    errors?: {
        status?: string[]
    },
};

const initialState: EditPostFormState = {
    success: false,
    errors: {},
    message: "",
}

export default function EditPostForm({ id, pet, contactEmail }: PostDetails) {

    // Catch error messages sent from the server-side validation and display them on the form UI
    const [state, action, isPending] = useActionState<EditPostFormState, FormData>(updatePost, initialState);

    const router = useRouter();

    // Preview image
    const [imagePreview, setImagePreview] = useState(pet?.image?.imgUrl);
    const [alertDialogOpen, setAlertDialogOpen] = useState(false);

    // Format date
    let dateLastSeen = "";
    if (pet?.dateLastSeen) dateLastSeen = formatDate(pet?.dateLastSeen);

    // Prevent losing field values the user just entered when the form is submitted but validation fails
    const [petName, setPetName] = useState(pet?.name);
    const [email, setEmail] = useState(contactEmail);
    const [date, setDate] = useState(dateLastSeen);
    const [city, setCity] = useState(pet?.location.city);
    const [zipcode, setZipcode] = useState(pet?.location.zipcode);
    const [description, setDescription] = useState(pet?.description);

    // Preview the uploaded image in the form
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file && file.size > 0) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    }

    // Return to the dashboard if the post is updated successfully
    if (state.success) {
        setTimeout(() => {
            redirect("/dashboard");
        }, 2000);
    }

    return (
        <Card className="w-full max-w-1/2 mx-auto my-10">
            <CardHeader>
                <CardTitle className="form-title">Edit Post Information</CardTitle>
            </CardHeader>

            <FieldSeparator />

            <form action={action}>
                <CardContent className="px-15">
                    <FieldSet>
                        <FieldLegend>Pet Information</FieldLegend>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-8">
                                <Field>
                                    <FieldLabel htmlFor="petName">Pet Name<span className="text-destructive">*</span></FieldLabel>
                                    <Input
                                        id="petName"
                                        name="petName"
                                        type="text"
                                        value={petName}
                                        onChange={(e) => setPetName(e.target.value)}
                                        required
                                        aria-invalid={Boolean(state.errors?.petName)}
                                        maxLength={12}
                                        placeholder="Enter the pet's name here" />
                                    <FieldError>{state.errors?.petName}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="species">Species<span className="text-destructive">*</span></FieldLabel>
                                    <Select
                                        required
                                        name="species"
                                        aria-invalid={Boolean(state.errors?.species)}
                                        defaultValue={pet?.species}>
                                        <SelectTrigger id="species" >
                                            <SelectValue placeholder="Select the pet's species" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {species.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{state.errors?.species}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="sex">Sex<span className="text-destructive">*</span></FieldLabel>
                                    <Select
                                        required
                                        name="sex"
                                        aria-invalid={Boolean(state.errors?.sex)}
                                        defaultValue={pet?.sex}>
                                        <SelectTrigger id="sex">
                                            <SelectValue placeholder="Select the pet's sex" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {sex.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{state.errors?.sex}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="status">Status<span className="text-destructive">*</span></FieldLabel>
                                    <Select
                                        required
                                        name="status"
                                        aria-invalid={Boolean(state.errors?.status)}
                                        defaultValue={pet?.status}>
                                        <SelectTrigger id="status" >
                                            <SelectValue placeholder="Select the pet's status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {status.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FieldError>{state.errors?.status}</FieldError>
                                </Field>

                                <Field className="col-span-2">
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            id="description"
                                            name="description"
                                            value={description || ""}
                                            onChange={(e) => setDescription(e.target.value)}
                                            aria-invalid={Boolean(state.errors?.description)}
                                            className="resize-none"
                                            placeholder="Provide a pet description here"
                                        />
                                    </InputGroup>
                                    <FieldError>{state.errors?.description}</FieldError>
                                </Field>
                            </div>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator className="mt-8 mb-1" />

                    <FieldSet>
                        <FieldLegend>Last Seen Information</FieldLegend>
                        < FieldGroup>
                            <div className="grid grid-cols-2 gap-8">
                                <Field>
                                    <FieldLabel htmlFor="city">City<span className="text-destructive">*</span></FieldLabel>
                                    <Input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        maxLength={20}
                                        aria-invalid={Boolean(state.errors?.city)}
                                        required
                                        placeholder="Enter city name here" />
                                    <FieldError>{state.errors?.city}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="state">State<span className="text-destructive">*</span></FieldLabel>
                                    <Combobox
                                        items={states}
                                        defaultValue={pet?.location.state} >
                                        <ComboboxInput
                                            id="state"
                                            name="state"
                                            required
                                            aria-invalid={Boolean(state.errors?.state)}
                                            placeholder="Select state" />
                                        <ComboboxContent>
                                            <ComboboxEmpty>No items found</ComboboxEmpty>
                                            <ComboboxList>
                                                {(item) => (
                                                    <ComboboxItem key={item.value} value={item.value}>
                                                        {item.label}
                                                    </ComboboxItem>
                                                )}
                                            </ComboboxList>
                                        </ComboboxContent>
                                    </Combobox>
                                    <FieldError>{state.errors?.state}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="zipcode">Zip Code<span className="text-destructive">*</span></FieldLabel>
                                    <Input
                                        id="zipcode"
                                        name="zipcode"
                                        type="text"
                                        value={zipcode}
                                        onChange={(e) => setZipcode(e.target.value)}
                                        aria-invalid={Boolean(state.errors?.zipcode)}
                                        required
                                        maxLength={5}
                                        placeholder="Enter the 5-digits zip code here" />
                                    <FieldError>{state.errors?.zipcode}</FieldError>
                                </Field>

                                <Field>
                                    <FieldLabel htmlFor="dateLastSeen">Date Last Seen<span className="text-destructive">*</span></FieldLabel>
                                    <Input
                                        id="dateLastSeen"
                                        name="dateLastSeen"
                                        type="date"
                                        aria-invalid={Boolean(state.errors?.dateLastSeen)}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required />
                                    <FieldError>{state.errors?.dateLastSeen}</FieldError>
                                </Field>
                            </div>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator className="mt-8 mb-1" />

                    <FieldSet>
                        <FieldLegend>Contact Information</FieldLegend>
                        <FieldGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <Field className="col-span-2">
                                    <FieldLabel htmlFor="email">Email<span className="text-destructive">*</span> <span className="text-sm text-muted-foreground">(This will be visible on your post)</span></FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        aria-invalid={Boolean(state.errors?.email)}
                                        required
                                        placeholder="example@email.com" />
                                    <FieldError>{state.errors?.email}</FieldError>
                                </Field>
                            </div>
                        </FieldGroup>
                    </FieldSet>

                    <FieldSeparator className="mt-8 mb-1" />

                    <FieldSet>
                        <FieldLegend>Pet Photo</FieldLegend>
                        <Card className="grid grid-cols-2 items-center px-5 mb-5">
                            <figure className="flex flex-col items-center border-r border-gray-200">
                                <Image
                                    src={imagePreview ?? "https://res.cloudinary.com/l0ozosb1/image/upload/v1789613502/no_image.avif"}
                                    width={500}
                                    height={500}
                                    style={{ objectFit: "contain" }}
                                    alt={pet?.image?.imgAltText ?? "This is a lost-pet image"}
                                    className="w-full h-50"
                                />
                                <figcaption className="text-gray-500">Current Photo</figcaption>
                            </figure>

                            <div className="place-self-center">
                                <FieldLabel htmlFor="image" className="orange-btn"><UploadIcon />Upload A Pet Photo</FieldLabel>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    aria-invalid={Boolean(state.errors?.image)}
                                    className="hidden" />
                                <FieldError>{state.errors?.image}</FieldError>
                            </div>

                            <input type="hidden" id="postID" name="postID" value={id} />
                        </Card>
                    </FieldSet>
                </CardContent>

                <CardFooter className="flex flex-col space-y-5">
                    {state.message &&
                        <Alert className={`border max-w-5/6 ${state.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
                            <CheckCircle2Icon color={state.success ? "#16A34A" : "#DC2626"} />
                            <AlertTitle className={state.success ? "text-green-600" : "text-red-600"}>{state.success ? "Post Updated Successfully!" : "Failed to Update the Post"}</AlertTitle>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    }

                    <div className="flex flex-row place-content-center space-x-20">
                        <Button className="secondary-btn" onClick={() => setAlertDialogOpen(true)}>Cancel</Button>
                        <Button className="primary-btn" type="submit" disabled={isPending}>
                            {isPending ? "Processing.." : "Save Changes"}
                        </Button>
                    </div>

                </CardFooter>
            </form>

            <AlertDialog open={alertDialogOpen} onOpenChange={setAlertDialogOpen}>
                <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-lg font-semibold">Back to Dashboard?</AlertDialogTitle>
                        <AlertDialogDescription className="text-base">The changes won't be saved.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="text-base rounded-sm">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => router.back()} className="text-base rounded-sm">
                            Go Back
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}