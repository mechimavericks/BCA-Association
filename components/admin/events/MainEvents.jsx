"use client";
import { uploadImage } from "@/lib/uploadImage";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const Button = ({ onClick, children }) => (
  <button
    className="px-4 py-2 bg-blue-500 text-white rounded"
    onClick={onClick}
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="border p-4 rounded shadow flex flex-col gap-3 justify-between items-center">
    {children}
  </div>
);

const Input = ({ type = "text", value, onChange, name }) => (
  <input
    name={name}
    type={type}
    defaultValue={value}
    onChange={(e) => onChange(e)}
    className="border p-2 rounded w-full"
  />
);

const Label = ({ children }) => (
  <label className="block font-semibold mb-1">{children}</label>
);

const Textarea = ({ value, onChange, rows = 4, name }) => (
  <textarea
    name={name}
    defaultValue={value}
    onChange={(e) => onChange(e)}
    rows={rows}
    className="border p-2 rounded w-full"
  />
);

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed  z-50 inset-0 flex items-center backdrop-blur-md justify-center bg-black bg-opacity-50">
      <div className="bg-white   goodScroll p-6 max-h-[90vh] overflow-y-scroll rounded shadow-lg w-[600px]">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  );
};

const MainEvent = ({ events }) => {
  const [editEvent, setEditEvent] = useState({
    title: "",
    shortDesc: "",
    content: "",
    banner: "",
    thumbnail: "",
    date: "01/02/2025",
    link: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editUploading, setEditUploading] = useState(false);
  const editorEditRef = useRef(null);
  const editorCreateRef = useRef(null);
  const NEXT_PUBLIC_TINYMCE_API_KEY= process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  const editorApiKey = NEXT_PUBLIC_TINYMCE_API_KEY || "your-api-key"; // Replace with your TinyMCE API key

  const router = useRouter();

  const [newEvent, setNewEvent] = useState({
    title: "",
    shortDesc: "",
    content: "",
    banner: "",
    thumbnail: "",
    date: "",
    link: "",
  });

  const handleChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value });
  };

  const handleCreateEditorChange = (content) => {
    setNewEvent({ ...newEvent, content });
  };

  const handleEdit = (event) => {
    setEditEvent(event);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    setEditEvent({ ...editEvent, [e.target.name]: e.target.value });
  };

  const handleEditEditorChange = (content) => {
    setEditEvent({ ...editEvent, content });
  };

  const handleSaveEdit = async () => {
    if (
      !editEvent.title ||
      !editEvent.shortDesc ||
      !editEvent.content ||
      !editEvent.date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setEditUploading(true);

    // Prepare data for update
    const updateData = {
      id: editEvent._id,
      title: editEvent.title,
      shortDesc: editEvent.shortDesc,
      content: editEvent.content,
      date: editEvent.date,
      link: editEvent.link,
    };

    // If there are new images, upload them
    if (editEvent.banner && typeof editEvent.banner !== "string") {
      const bannerImage = await uploadImage(editEvent.banner);
      if (!bannerImage) {
        alert("Failed to upload banner image");
        setEditUploading(false);
        return;
      }
      updateData.banner = bannerImage;
    }

    if (editEvent.thumbnail && typeof editEvent.thumbnail !== "string") {
      const thumbnailImage = await uploadImage(editEvent.thumbnail);
      if (!thumbnailImage) {
        alert("Failed to upload thumbnail image");
        setEditUploading(false);
        return;
      }
      updateData.thumbnail = thumbnailImage;
    }

    // Update event through API
    const res = await fetch(`/api/events/${editEvent._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!res.ok) {
      alert("Failed to update event");
      setEditUploading(false);
      return;
    }

    const data = await res.json();

    if (data.status === "success") {
      alert("Event updated successfully");
      router.refresh();
    } else {
      alert("Failed to update event: " + data.message);
    }

    setEditUploading(false);
    setIsEditModalOpen(false);
  };

  const handleCreate = async () => {
    if (
      !newEvent.title ||
      !newEvent.shortDesc ||
      !newEvent.content ||
      !newEvent.banner ||
      !newEvent.thumbnail ||
      !newEvent.date
    ) {
      //check which firld is missin
      switch (true) {
        case !newEvent.title:
          alert("Title is required");
          break;
        case !newEvent.shortDesc:
          alert("Short Description is required");
          break;
        case !newEvent.content:
          alert("Content is required");
          break;
        case !newEvent.banner:
          alert("Banner is required");
          break;
        case !newEvent.thumbnail:
          alert("Thumbnail is required");
          break;
        case !newEvent.date:
          alert("Date is required");
        default:
          break;
      }

      return;
    }
    setUploading(true);

    // upload image

    let bannerImage = await uploadImage(newEvent.banner);
    let thumbnailImage = await uploadImage(newEvent.thumbnail);

    if (!bannerImage || !thumbnailImage) {
      alert("Failed to upload image");
      return;
    }

    const uploadData = {
      title: newEvent.title,
      shortDesc: newEvent.shortDesc,
      content: newEvent.content,
      banner: bannerImage,
      thumbnail: thumbnailImage,
      date: newEvent.date,
    };

    // create event
    const res = await fetch("/api/events", {
      method: "POST",
      body: JSON.stringify(uploadData),
    });

    if (!res.ok) {
      alert("Failed to create event");
      return;
    }

    const data = await res.json();

    if (data.status === "success") {
      alert("Event created successfully");
      router.refresh();
    }

    setUploading(false);

    setIsCreateModalOpen(false);
    setNewEvent({
      title: "",
      shortDesc: "",
      content: "",
      banner: "",
      thumbnail: "",
      date: "",
      link: "",
    });
  };

  return (
    <div className="p-6 w-full">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>Create Event</Button>
      </div>
      {events.length !== 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-6">
          {events.map((event) => (
            <Card key={event._id}>
              <div className="flex flex-col">
                <img
                  src={`https://wsrv.nl/?w=300&url=${event?.thumbnail}&w=100&h=100`}
                  alt={event.title}
                  className="w-full  object-contain rounded"
                />
                <h2 className="text-lg font-semibold">{event.title}</h2>
                <p className="text-sm text-gray-500">
                  {moment(event.date).fromNow()}
                </p>
              </div>
              <Button onClick={() => handleEdit(event)}>Edit</Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No events found</div>
      )}

      {/* Edit Event Modal */}
      <Modal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Event"
      >
        {(!editUploading && (
          <div className="flex flex-col">
            <Label>Title</Label>
            <Input
              name="title"
              value={editEvent?.title}
              onChange={handleEditChange}
            />
            <Label>Short Description</Label>
            <Textarea
              name="shortDesc"
              value={editEvent?.shortDesc}
              onChange={handleEditChange}
            />
            <Label>Content</Label>
            <Editor
              apiKey="your-api-key" // Replace with your TinyMCE API key
              onInit={(evt, editor) => (editorEditRef.current = editor)}
              initialValue={editEvent?.content}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleEditEditorChange}
            />

            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={new Date(editEvent?.date).toISOString().split("T")[0]}
              onChange={handleEditChange}
            />

            <Label>Link</Label>
            <Input
              name="link"
              value={editEvent?.link}
              onChange={handleEditChange}
            />

            <Label>Thumbnail Image</Label>
            {(editEvent.thumbnail && (
              <div className="flex relative w-full h-40 rounded overflow-hidden">
                <button
                  className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 duration-200"
                  onClick={() =>
                    setEditEvent({ ...editEvent, thumbnail: "" })
                  }
                >
                  X
                </button>
                <img
                  src={
                    typeof editEvent.thumbnail === "string"
                      ? editEvent.thumbnail
                      : URL.createObjectURL(editEvent.thumbnail)
                  }
                  alt="Thumbnail"
                  className="w-40  object-contain rounded"
                />
              </div>
            )) || (
              <Input
                type="file"
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    thumbnail: e.target.files[0],
                  })
                }
              />
            )}
            <Label>Banner</Label>
            {(editEvent.banner && (
              <div className="relative rounded ">
                <img
                  src={
                    typeof editEvent.banner === "string"
                      ? editEvent.banner
                      : URL.createObjectURL(editEvent.banner)
                  }
                  alt="Banner"
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 duration-200"
                  onClick={() => setEditEvent({ ...editEvent, banner: "" })}
                >
                  X
                </button>
              </div>
            )) || (
              <Input
                type="file"
                onChange={(e) =>
                  setEditEvent({
                    ...editEvent,
                    banner: e.target.files[0],
                  })
                }
              />
            )}
            <div className="mt-4 flex justify-between">
              <Button onClick={handleSaveEdit}>Save</Button>
              <Button onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
            </div>
          </div>
        )) || <div className="text-center">Uploading...</div>}
      </Modal>

      {/* Create Event Modal */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Event"
      >
        {(!uploading && (
          <div className="flex flex-col">
            <Label>Title</Label>
            <Input
              name="title"
              value={newEvent.title}
              onChange={handleChange}
            />
            <Label>Short Description</Label>
            <Textarea
              name="shortDesc"
              value={newEvent.shortDesc}
              onChange={handleChange}
            />
            <Label>Content</Label>
            <Editor
              apiKey={editorApiKey} // Replace with your TinyMCE API key
              onInit={(evt, editor) => (editorCreateRef.current = editor)}
              init={{
                height: 300,
                menubar: true,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={handleCreateEditorChange}
            />

            <Label>Date</Label>
            <Input
              type="date"
              name="date"
              value={newEvent.date}
              onChange={handleChange}
            />

            <Label>Link</Label>
            <Input name="link" value={newEvent.link} onChange={handleChange} />

            <Label>Thumbnail Image</Label>
            {(newEvent.thumbnail && (
              <div className="flex relative w-full h-40 rounded overflow-hidden">
                <button
                  className="absolute top-0 right-0 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 duration-200"
                  onClick={() => setNewEvent({ ...newEvent, thumbnail: "" })}
                >
                  X
                </button>
                <img
                  src={URL.createObjectURL(newEvent.thumbnail)}
                  alt="Thumbnail"
                  className="w-40  object-contain rounded"
                />
              </div>
            )) || (
              <Input
                type="file"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, thumbnail: e.target.files[0] })
                }
              />
            )}
            <Label>Banner</Label>
            {(newEvent.banner && (
              <div className="relative rounded ">
                <img
                  src={URL.createObjectURL(newEvent.banner)}
                  alt="Banner"
                  className="w-full h-40 object-cover rounded"
                />
                <button
                  className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 duration-200"
                  onClick={() => setNewEvent({ ...newEvent, banner: "" })}
                >
                  X
                </button>
              </div>
            )) || (
              <Input
                type="file"
                onChange={(e) =>
                  setNewEvent({ ...newEvent, banner: e.target.files[0] })
                }
              />
            )}
            <div className="mt-4 flex justify-between">
              <Button onClick={() => handleCreate(newEvent)}>Create</Button>
              <Button onClick={() => setIsCreateModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )) || <div className="text-center">Uploading...</div>}
      </Modal>
    </div>
  );
};

export default MainEvent;