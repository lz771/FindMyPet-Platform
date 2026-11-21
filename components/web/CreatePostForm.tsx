"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPost } from "@/app/actions/post.action"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import { InputGroup, InputGroupTextarea } from "../ui/input-group"
import { Field, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "../ui/field"
import { CheckCircle2Icon, UploadIcon, XIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
import { FormState, sex, species, states } from "@/lib/shared/shared"

const initialState: FormState = {
    success: false,
    errors: {},
    message: "",
}

export default function CreatePostForm() {
    const [state, action, isPending] = useActionState<FormState, FormData>(createPost, initialState);

    // Preserve the input field values the user entered
    const [petName, setPetName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [description, setDescription] = useState("");
    const [hasImage, setHasImage] = useState(false);

    // Delete selected image
    const imgRef = useRef<HTMLInputElement>(null);
    const resetImage = () => {
        if (imgRef.current) {
            imgRef.current.value = "";
            setHasImage(false);
        }
    }

    // Hidden the image delete button when server-side validation fails
    useEffect(() => {
            setHasImage(false);
    }, [state]);

    return (
        <Card className="w-full max-w-1/2 mx-auto my-10">
            <CardHeader>
                <CardTitle className="form-title">Lost Pet Report Form</CardTitle>
                <CardDescription className="text-center">Submit the form to create a lost-pet post in the Lost Pet Gallery</CardDescription>
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
                                        aria-invalid={Boolean(state.errors?.species)}>
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
                                        aria-invalid={Boolean(state.errors?.sex)}>
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

                                <Field className="col-span-2">
                                    <FieldLabel htmlFor="description">Description</FieldLabel>
                                    <InputGroup>
                                        <InputGroupTextarea
                                            id="description"
                                            name="description"
                                            value={description}
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
                                        items={states}>
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
                        <div className="flex items-center gap-2">
                            <FieldLabel htmlFor="image" className="upload-btn" ><UploadIcon size={15} />Upload A Pet Photo</FieldLabel>
                            <input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                ref={imgRef}
                                onChange={() => setHasImage(true)}
                                aria-invalid={Boolean(state.errors?.image)}
                                className="file:hidden" />
                            {hasImage &&
                                <button className="cursor-pointer" type="button" onClick={resetImage}><XIcon size={15} /></button>
                            }
                        </div>
                        <FieldError>{state.errors?.image}</FieldError>
                    </FieldSet>
                </CardContent>

                <CardFooter className="flex flex-col space-y-5 mt-5">
                    {state.message &&
                        <Alert className={`border max-w-5/6 ${state.success ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
                            <CheckCircle2Icon color={state.success ? "#16A34A" : "#DC2626"} />
                            <AlertTitle className={state.success ? "text-green-600" : "text-red-600"}>{state.success ? "Post Updated Successfully!" : "Failed to Update the Post"}</AlertTitle>
                            <AlertDescription>{state.message}</AlertDescription>
                        </Alert>
                    }

                    <div className="flex flex-row place-content-center space-x-20">
                        <Button className="primary-btn" type="submit" disabled={isPending}>
                            {isPending ? "Processing.." : "Submit"}
                        </Button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    )
}