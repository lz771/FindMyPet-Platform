"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Form from 'next/form'

const species = [
    { label: "All", value: "All" },
    { label: "Cat", value: "Cat" },
    { label: "Dog", value: "Dog" },
    { label: "Bird", value: "Bird" },
    { label: "Other", value: "Other" },
]

const sex = [
    { label: "All", value: "All" },
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Unknown", value: "Unknown" },
]

const status = [
    { label: "Lost", value: "Lost" },
    { label: "Reunited", value: "Reunited" },
]

const states = [
    { label: "All", value: "All" },
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

export default function FilterForm() {
    const [selectedSpecies, setSelectedSpecies] = useState<string | null>("All");
    const [selectedStatus, setSelectedStatus] = useState<string | null>("Lost");
    const [selectedSex, setSelectedSex] = useState<string | null>("All");
    const [selectedState, setSelectedState] = useState<string | null>("All");

    function handleReset() {
        setSelectedSpecies("All");
        setSelectedStatus("Lost");
        setSelectedSex("All");
        setSelectedState("All");
    }

    return (
        <Form action="/lost-pet-gallery">
            <div className="max-w-full bg-white flex flex-row space-x-10 px-6 py-4 shadow-sm">
                <div>
                    <Label htmlFor="species">Species</Label>
                    <Select
                        name="species"
                        value={selectedSpecies}
                        onValueChange={(e) => setSelectedSpecies(e)}>
                        <SelectTrigger id="species">
                            <SelectValue className="w-15" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {species.map((item) => (
                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                        name="status"
                        value={selectedStatus}
                        onValueChange={(e) => setSelectedStatus(e)}>
                        <SelectTrigger id="status" >
                            <SelectValue className="w-15" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {status.map((item) => (
                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="sex">Sex</Label>
                    <Select
                        name="sex"
                        value={selectedSex}
                        onValueChange={(e) => setSelectedSex(e)}>
                        <SelectTrigger id="sex" >
                            <SelectValue className="w-15" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {sex.map((item) => (
                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="state">State</Label>
                    <Combobox
                        items={states}
                        value={selectedState}
                        onValueChange={(e) => setSelectedState(e)}>
                        <ComboboxInput
                            id="state"
                            name="state"
                            className="w-25" />
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
                </div>

                <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        type="text"
                        className="w-35" />
                </div>

                <div>
                    <Label htmlFor="zipcode">Zip Code</Label>
                    <Input
                        id="zipcode"
                        name="zipcode"
                        type="text"
                        className="w-35" />
                </div>

                <div>
                    <Label htmlFor="petName">Pet Name</Label>
                    <Input
                        id="petName"
                        name="petName"
                        type="text"
                        className="w-35" />
                </div>

                <div>
                    <Label htmlFor="petID">Pet ID</Label>
                    <Input
                        id="petID"
                        name="petID"
                        type="text"
                        className="w-35" />
                </div>

                <div className="ml-auto py-2 space-x-8">
                    <Button className="rounded-md p-4" type="reset" onClick={handleReset}>Clear All</Button>
                    <Button className="rounded-md p-4" type="submit">Find</Button>
                </div>
            </div>
        </Form>
    )
}