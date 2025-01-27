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
import { updateUser } from "@/redux/userSlice";

export default function EditProfileModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const [formValues, setFormValues] = useState(user);
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setFormValues(user); // Sync the form with user data whenever the modal opens
    setUploadedImage(user.logo || "");
  }, [user]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formValues.name) newErrors.name = "Restaurant name is required.";
    if (!formValues.address) newErrors.address = "Address is required.";
    if (!formValues.latitude) newErrors.latitude = "Latitude is required.";
    if (!formValues.longitude) newErrors.longitude = "Longitude is required.";
    if (!formValues.phone) newErrors.phone = "Phone number is required.";
    if (!formValues.area) newErrors.area = "Area is required.";
    if (!formValues.type) newErrors.type = "Restaurant type is required.";
    if (!formValues.opensAt) newErrors.opensAt = "Opening time is required.";
    if (!formValues.closesAt) newErrors.closesAt = "Closing time is required.";
    if (formValues.daysAvailability.length === 0)
      newErrors.daysAvailability = "Select at least one day.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      dispatch(updateUser({ ...formValues, logo: uploadedImage }));
      console.log("Profile updated:", formValues);
      onClose();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleDay = (day: string) => {
    setFormValues((prev) => ({
      ...prev,
      daysAvailability: prev.daysAvailability.includes(day)
        ? prev.daysAvailability.filter((d) => d !== day)
        : [...prev.daysAvailability, day],
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
                value={formValues.name}
                onChange={(e) =>
                  setFormValues({ ...formValues, name: e.target.value })
                }
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-1.5">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={formValues.latitude}
                  onChange={(e) =>
                    setFormValues({ ...formValues, latitude: e.target.value })
                  }
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={formValues.longitude}
                  onChange={(e) =>
                    setFormValues({ ...formValues, longitude: e.target.value })
                  }
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
                value={formValues.phone}
                onChange={(e) =>
                  setFormValues({ ...formValues, phone: e.target.value })
                }
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
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
                value={formValues.type}
                onValueChange={(value) =>
                  setFormValues({
                    ...formValues,
                    type: value as
                      | "Veg"
                      | "Non-Veg"
                      | "Multicuisine"
                      | "Cafe"
                      | "",
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select restaurant type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Veg">Veg</SelectItem>
                  <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                  <SelectItem value="Cafe">Cafe</SelectItem>
                  <SelectItem value="Multicuisine">Multicuisine</SelectItem>
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
                  id="opensAt"
                  type="time"
                  value={formValues.opensAt}
                  onChange={(e) =>
                    setFormValues({ ...formValues, opensAt: e.target.value })
                  }
                />
                {errors.opensAt && (
                  <p className="text-red-500 text-sm">{errors.opensAt}</p>
                )}
              </div>

              {/* Closes At */}
              <div className="grid gap-1.5">
                <Label htmlFor="closesAt">Closes At</Label>
                <Input
                  id="closesAt"
                  type="time"
                  value={formValues.closesAt}
                  onChange={(e) =>
                    setFormValues({ ...formValues, closesAt: e.target.value })
                  }
                />
                {errors.closesAt && (
                  <p className="text-red-500 text-sm">{errors.closesAt}</p>
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
                      checked={formValues.daysAvailability.includes(day)}
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
