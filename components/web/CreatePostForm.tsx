"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createPost } from "@/app/actions/post.action"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import { InputGroup, InputGroupTextarea } from "../ui/input-group"
import { Label } from "../ui/label"

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

type FormState = {
    errors?: {
        petName?: string[]
        email?: string[]
        species?: string[]
        sex?: string[]
        dateLastSeen?: string[]
        city?: string[]
        state?: string[]
        zipcode?: string[]
        description?: string[]
        image?: string[]
    }
    message?: string
    inputs?: {
        petName: string,
        email: string,
        dateLastSeen: string,
        city: string,
        zipcode: string,
        description: string,
    }
}

const initialState: FormState = {
    errors: {},
    message: "",
    inputs: {
        petName: "",
        email: "",
        dateLastSeen: "",
        city: "",
        zipcode: "",
        description: "",
    },
}


export default function CreatePostForm() {

    // Catch error messages send from the server side validation and disply them on the form UI
    const [state, action, isPending] = useActionState<FormState, FormData>(createPost, initialState);


    // Prevent losing field values the user just entered when form is submitted but validation fails
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [dateValue, setDateValue] = useState("");
    const [cityValue, setCityValue] = useState("");
    const [zipValue, setZipValue] = useState("");
    const [descValue, setDescValue] = useState("");

    useEffect(() => {
        setNameValue(state.inputs?.petName ?? "");
    }, [state.inputs?.petName]);

    useEffect(() => {
        setEmailValue(state.inputs?.email ?? "");
    }, [state.inputs?.email]);

        useEffect(() => {
        setDateValue(state.inputs?.dateLastSeen ?? "");
    }, [state.inputs?.dateLastSeen]);

        useEffect(() => {
        setCityValue(state.inputs?.city ?? "");
    }, [state.inputs?.city]);

        useEffect(() => {
        setZipValue(state.inputs?.zipcode ?? "");
    }, [state.inputs?.zipcode]);

        useEffect(() => {
        setDescValue(state.inputs?.description ?? "");
    }, [state.inputs?.description]);


    return (
        <Card className="w-full max-w-1/2 mx-auto">
            <CardContent>
                <form action={action}>
                    <div className=" space-y-10 lg:space-y-15 px-4 lg:px-10 py-8">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="space-y-1">
                                <Label htmlFor="petName">Pet Name <span className="text-destructive">*</span></Label>
                                <Input
                                    id="petName"
                                    name="petName"
                                    type="text"
                                    value={nameValue}
                                    onChange={(e) => setNameValue(e.target.value)}
                                    required
                                    maxLength={12}
                                    placeholder="Enter the pet's name here..." />
                                {state.errors?.petName && <p className="text-red-500 text-sm">{state.errors.petName[0]}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="email">Contact Email <span className="text-destructive">*</span></Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={emailValue}
                                    onChange={(e) => setEmailValue(e.target.value)}
                                    required
                                    placeholder="example@email.com" />
                                {state.errors?.email && <p className="text-red-500 text-sm">{state.errors.email[0]}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="space-y-1">
                                <Label htmlFor="species">Species <span className="text-destructive">*</span></Label>
                                <Select
                                    required
                                    name="species">
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
                                {state.errors?.species && <p className="text-red-500 text-sm">{state.errors.species[0]}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="sex">Sex <span className="text-destructive">*</span></Label>
                                <Select
                                    required
                                    name="sex">
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
                                {state.errors?.sex && <p className="text-red-500 text-sm">{state.errors.sex[0]}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="dateLastSeen">Date Last Seen <span className="text-destructive">*</span></Label>
                                <Input
                                    id="dateLastSeen"
                                    name="dateLastSeen"
                                    type="date"
                                    value={dateValue}
                                    onChange={(e) => setDateValue(e.target.value)}
                                    required />
                                {state.errors?.dateLastSeen && <p className="text-red-500 text-sm">{state.errors.dateLastSeen[0]}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-5">
                            <div className="space-y-1">
                                <Label htmlFor="city">City <span className="text-destructive">*</span></Label>
                                <Input
                                    id="city"
                                    name="city"
                                    type="text"
                                    value={cityValue}
                                    onChange={(e) => setCityValue(e.target.value)}
                                    maxLength={20}
                                    required
                                    placeholder="Enter city name here..." />
                                {state.errors?.city && <p className="text-red-500 text-sm">{state.errors.city[0]}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="state">State <span className="text-destructive">*</span></Label>
                                <Combobox items={states} >
                                    <ComboboxInput
                                        id="state"
                                        name="state"
                                        required
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
                                {state.errors?.state && <p className="text-red-500 text-sm">{state.errors.state[0]}</p>}
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="zipcode">ZIP Code <span className="text-destructive">*</span></Label>
                                <Input
                                    id="zipcode"
                                    name="zipcode"
                                    type="text"
                                    value={zipValue}
                                    onChange={(e) => setZipValue(e.target.value)}
                                    required
                                    maxLength={5}
                                    placeholder="Enter the 5-digits zip code here..." />
                                {state.errors?.zipcode && <p className="text-red-500 text-sm">{state.errors.zipcode[0]}</p>}
                            </div>
                        </div>

                        <div>
                            <div className="space-y-1">
                                <Label htmlFor="description">Description </Label>
                                <InputGroup>
                                    <InputGroupTextarea
                                        id="description"
                                        name="description"
                                        value={descValue}
                                        onChange={(e) => setDescValue(e.target.value)}
                                        className="resize-none"
                                        placeholder="Provide a description of the lost pet here..."
                                    />
                                </InputGroup>
                                {state.errors?.description && <p className="text-red-500 text-sm">{state.errors.description[0]}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3">
                            <div className="space-y-1">
                                <Label htmlFor="image" className="">Upload Pet Photo </Label>
                                <Input
                                    id="image"
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="bg-orange-200 font-semibold file:mr-6" />
                                {state.errors?.image && <p className="text-red-500 text-sm">{state.errors.image[0]}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-3">
                            <Button className="col-start-2" type="submit" disabled={isPending}>
                                {isPending ? "Processing.." : "Submit"}
                            </Button>
                        </div>
                        {state.message && <p className="text-red-500">{state.message}</p>}
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}