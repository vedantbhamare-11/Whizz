"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CloudUpload } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { updateVendor } from "@/redux/vendorSlice";
import { editProfileApi } from "@/app/API/restaurant";
import { convertTo24Hour }  from "@/lib/convertTime";
import { toast } from "react-toastify";

export default function EditProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const vendor = useSelector((state: RootState) => state.vendor.vendor);
  
  const [formValues, setFormValues] = useState(vendor);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [newImage, setNewImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormValues({...vendor, startTime: convertTo24Hour(vendor.startTime), endTime: convertTo24Hour(vendor.endTime) }); // Sync the form with user data whenever the modal opens
    setUploadedImage(vendor.vendorLogo !== "null" || vendor.vendorLogo !== null ? vendor.vendorLogo : "");
  }, [vendor]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.vendorName) newErrors.vendorName = "Restaurant name is required.";
    if (!formValues.address) newErrors.address = "Address is required.";
    if (!formValues.latitude) newErrors.latitude = "Latitude is required.";
    if (!formValues.longitude) newErrors.longitude = "Longitude is required.";
    if (!formValues.vendorPhone) newErrors.vendorPhone = "Phone number is required.";
    if (!formValues.area) newErrors.area = "Area is required.";
    if (!formValues.restaurantType) newErrors.restaurantType = "Restaurant type is required.";
    if (!formValues.startTime) newErrors.startTime = "Opening time is required.";
    if (!formValues.endTime) newErrors.endTime = "Closing time is required.";
    if (formValues.availableDays.length === 0)
      newErrors.availableDays = "Select at least one day.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await editProfileApi({...formValues, vendorLogo: newImage !== null ? newImage : vendor.vendorLogo});
        if (response.success) {
          dispatch(updateVendor(response.data));
          toast.success(response.message);
        }
      } catch (error: any) {
        toast.error(error);
      }
      onClose();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setNewImage(file);
    }
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) => ({
      ...prev,
      availableDays: prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <form className="grid grid-cols-2 gap-5 mt-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Restaurant Name */}
            <div className="grid gap-1.5">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input
                id="name"
                value={formValues.vendorName}
                onChange={(e) =>
                  setFormValues({ ...formValues, vendorName: e.target.value })
                }
              />
              {errors.vendorName && (
                <p className="text-red-500 text-sm">{errors.vendorName}</p>
              )}
            </div>

            {/* Address */}
            <div className="grid gap-1.5">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formValues.address}
                onChange={(e) =>
                  setFormValues({ ...formValues, address: e.target.value })
                }
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address}</p>
              )}
            </div>

            {/* Latitude & Longitude */}
            {/* Latitude & Longitude */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={formValues.latitude ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                      setFormValues({ ...formValues, latitude: value });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        latitude: "", // Clear error if the input is valid
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        latitude: "Please enter a valid decimal number",
                      }));
                    }
                  }}
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={formValues.longitude ?? ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^-?\d*\.?\d*$/.test(value)) {
                      setFormValues({ ...formValues, longitude: value });
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        longitude: "", // Clear error if the input is valid
                      }));
                    } else {
                      setErrors((prevErrors) => ({
                        ...prevErrors,
                        longitude: "Please enter a valid decimal number",
                      }));
                    }
                  }}
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm">{errors.longitude}</p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="grid gap-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formValues.vendorPhone}
                maxLength={10} // Prevent input beyond 10 digits
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    // Only allow numeric input and up to 10 digits
                    setFormValues({ ...formValues, vendorPhone: value });
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      phone: "", // Clear error if the input is valid
                    }));
                  } else {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      vendorPhone: "Please enter a valid 10-digit phone number",
                    }));
                  }
                }}
              />
              {errors.vendorPhone && (
                <p className="text-red-500 text-sm">{errors.vendorPhone}</p>
              )}
            </div>

            {/* Area */}
            <div className="grid gap-1.5">
              <Label htmlFor="area">Area</Label>
              <Select
                value={formValues.area}
                onValueChange={(value) =>
                  setFormValues({
                    ...formValues,
                    area: value as "Nungambakkam" | "Anna Nagar" | "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nungambakkam">Nungambakkam</SelectItem>
                  <SelectItem value="Anna Nagar">Anna Nagar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Restaurant Type */}
            <div className="grid gap-1.5">
              <Label htmlFor="restaurantType">Restaurant Type</Label>
              <Select
                value={formValues.restaurantType}
                onValueChange={(value) =>
                  setFormValues({
                    ...formValues,
                    restaurantType: value as
                      | "VEG"
                      | "NON-VEG"
                      | "MC"
                      | "CAFE",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select restaurant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VEG">Veg</SelectItem>
                  <SelectItem value="NON-VEG">Non-Veg</SelectItem>
                  <SelectItem value="CAFE">Cafe</SelectItem>
                  <SelectItem value="MC">Multicuisine</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Logo Upload */}
            <Label htmlFor="logo">Logo</Label>
            <div className="grid gap-1.5">
              <Label
                htmlFor="logoInput"
                className="border border-gray-300 rounded-lg p-2 cursor-pointer"
              >
                <div className="border-2 p-2 bg-[#FAFAFA] border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center relative">
                  {uploadedImage ? (
                    <Image
                      src={uploadedImage}
                      alt="Uploaded"
                      className="object-contain h-full max-h-[270px] rounded-md"
                      width={220}
                      height={220}
                    />
                  ) : (
                    <div className="flex justify-center flex-row gap-2 h-[270px] items-center">
                      <CloudUpload size={24} />
                      <span className="font-medium">Upload</span>
                    </div>
                  )}
                </div>
                <Input
                  id="logoInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Label>
            </div>

            {/* Opens At & Closes At */}
            <div className="grid grid-cols-2 gap-4">
              {/* Opens At */}
              <div className="grid gap-1.5">
                <Label htmlFor="opensAt">Opens At</Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formValues.startTime}
                  onChange={(e) =>
                    setFormValues({ ...formValues, startTime: e.target.value })
                  }
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm">{errors.startTime}</p>
                )}
              </div>

              {/* Closes At */}
              <div className="grid gap-1.5">
                <Label htmlFor="closesAt">Closes At</Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formValues.endTime}
                  onChange={(e) =>
                    setFormValues({ ...formValues, endTime: e.target.value })
                  }
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm">{errors.endTime}</p>
                )}
              </div>
            </div>

            {/* Days Available */}
            <div className="space-y-2">
              <Label>Days Available</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ].map((day) => (
                  <div key={day} className="flex items-center gap-2">
                    <Checkbox
                      checked={formValues.availableDays.includes(day)}
                      onCheckedChange={() => toggleDay(day)}
                    />
                    <Label>{day}</Label>
                  </div>
                ))}
              </div>
              {errors.daysAvailability && (
                <p className="text-red-500 text-sm">
                  {errors.daysAvailability}
                </p>
              )}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-4 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[#3CAE06] text-white hover:bg-green-600"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
