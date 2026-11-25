"use client"

import { useState } from "react"
import { Button } from "../ui/button"
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import Form from 'next/form'
import { useRouter } from 'next/navigation'
import { sex, species, status, states } from "@/lib/shared/shared"

const speciesOptions = [
    { label: "All", value: "All" },
    ...species,
]

const genderOptions = [
    { label: "All", value: "All" },
    ...sex,
]

const stateOptions = [
    { label: "All", value: "All" },
    ...states,
]

const sortBy = [
    { label: "Most recently reported", value: "Most recently reported" },
    { label: "Most recently updated", value: "Most recently updated" },
]

export default function FilterForm() {
    const router = useRouter();

    const [selectedSpecies, setSelectedSpecies] = useState<string | null>("All");
    const [selectedStatus, setSelectedStatus] = useState<string | null>("Lost");
    const [selectedSex, setSelectedSex] = useState<string | null>("All");
    const [selectedState, setSelectedState] = useState<string | null>("All");
    const [selectedSortBy, setSelectedSortBy] = useState<string | null>("Most recently reported");

    function handleReset() {
        setSelectedSpecies("All");
        setSelectedStatus("Lost");
        setSelectedSex("All");
        setSelectedState("All");
        setSelectedSortBy("Most recently reported");
        router.push("/lost-pet-gallery");
    }

    return (
        <Form action="/lost-pet-gallery">
            <div className="max-w-full bg-white flex flex-row space-x-5 px-6 py-4 shadow-sm">
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
                                {speciesOptions.map((item) => (
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
                                {genderOptions.map((item) => (
                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor="state">State</Label>
                    <Combobox
                        items={stateOptions}
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

                <div>
                    <Label htmlFor="sortBy">Sort by</Label>
                    <Select
                        name="sortBy"
                        value={selectedSortBy}
                        onValueChange={(e) => setSelectedSortBy(e)}>
                        <SelectTrigger id="sortBy" >
                            <SelectValue className="w-32" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {sortBy.map((item) => (
                                    <SelectItem key={item.value} value={item.value}> {item.label} </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="ml-auto py-2 space-x-8">
                    <Button className="rounded-md p-4" type="reset" onClick={handleReset}>Clear All</Button>
                    <Button className="rounded-md p-4" type="submit">Find</Button>
                </div>
            </div>
        </Form>
    )
}