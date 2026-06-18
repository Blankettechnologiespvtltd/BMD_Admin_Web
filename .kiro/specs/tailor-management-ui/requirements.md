# Requirements Document

## Introduction

This feature redesigns two UI components in the BMD-Admin (BookMyDarzi) React admin panel: **AddTailor.jsx** and **FullDetails.jsx**. It also fixes related routing and layout bugs in **TailorDetails.jsx**.

The goal is to bring both components to a production-level standard — polished visual design, structured form sections, proper field validation, correct API integration, consistent use of the shared Layout/Outlet pattern, and reliable data flow between pages.

The project stack is React 19, Vite, Tailwind CSS v4, React Router DOM v7, and Axios. The color scheme uses teal-700/teal-800 as the primary color and orange-500 as the accent color.

---

## Glossary

- **AddTailor_Form**: The modal-hosted form component (`AddTailor.jsx`) used to register a new tailor.
- **FullDetails_Page**: The full-page detail component (`FullDetails.jsx`) that displays and manages a single tailor's complete profile.
- **TailorDetails_Page**: The tailor list page (`TailorDetails.jsx`) that hosts the Add Tailor modal and the tailor table with a "View" action per row.
- **Layout**: The shared sidebar + `<Outlet>` wrapper (`Layout.jsx`) that provides navigation. All authenticated pages render inside its `<Outlet>`.
- **Tailor_Record**: The data object representing a single tailor, containing fields: `id`, `full_name`, `email`, `mobile`, `address`, `specialization`, `role`, `active`, `verify`, `aadhar`, `pan`, `other`.
- **KYC_Panel**: The section within FullDetails_Page that displays Aadhaar, PAN, and Other document cards with Upload, View, and Delete actions.
- **Edit_Mode**: The UI state in FullDetails_Page where all editable fields are active inputs/selects rather than read-only text.
- **Read_Mode**: The default UI state in FullDetails_Page where fields display values as read-only text.
- **Toast_Notification**: A transient, non-blocking on-screen message that appears after an action (success or error) and disappears automatically after 3 seconds.
- **Confirm_Dialog**: A browser `window.confirm` or custom modal dialog that requires explicit user confirmation before a destructive action proceeds.
- **API_Server**: The backend REST API reachable at `http://192.168.1.2:8000/api/v1`.

---

## Requirements

### Requirement 1: Routing and Layout Architecture

**User Story:** As an admin, I want all pages to render consistently inside the shared sidebar layout, so that navigation is always visible and the UI does not show a double sidebar.

#### Acceptance Criteria

1. THE App SHALL define a parent route using the Layout component so that its `<Outlet>` renders child pages — `/tailorDetails`, `/fulldetails`, and `/addtailor` MUST be nested under this parent Layout route.
2. WHEN FullDetails_Page is rendered, THE FullDetails_Page SHALL NOT instantiate or render the Layout component directly inside its own JSX tree.
3. WHEN TailorDetails_Page is rendered, THE TailorDetails_Page SHALL NOT instantiate or render the Layout component directly inside its own JSX tree.
4. THE Layout SHALL render the sidebar and an `<Outlet>` only, delegating all page content to child route components.

---

### Requirement 2: Navigation from Tailor List to Full Details

**User Story:** As an admin, I want clicking "View" on a tailor row to navigate to the FullDetails_Page with the correct tailor data, so that I can see and manage that tailor's profile.

#### Acceptance Criteria

1. WHEN the admin clicks "View" on a tailor row, THE TailorDetails_Page SHALL call `navigate("/fulldetails", { state: { tailor } })` passing the full Tailor_Record as navigation state.
2. WHEN the admin clicks "View" on a tailor row, THE TailorDetails_Page SHALL navigate to the FullDetails_Page without any side effects such as navigating on every render cycle.
3. THE TailorDetails_Page SHALL NOT call `navigate()` unconditionally or outside of an explicit user action handler.
4. WHEN FullDetails_Page mounts, THE FullDetails_Page SHALL read the tailor data from `location.state?.tailor` and display it in the profile and detail fields.
5. IF `location.state?.tailor` is undefined when FullDetails_Page mounts, THEN THE FullDetails_Page SHALL display empty/placeholder values and remain functional without throwing a runtime error.

---

### Requirement 3: Add Tailor Modal — Width and Container

**User Story:** As an admin, I want the Add Tailor form modal to be wide enough to display its multi-section layout properly, so that the form is readable and usable.

#### Acceptance Criteria

1. THE TailorDetails_Page SHALL render the AddTailor modal container with a maximum width of at least `max-w-3xl` (768px) or wider to accommodate a two-column personal-info grid and a three-column KYC grid.
2. WHEN the modal is open, THE TailorDetails_Page SHALL allow the modal to expand to `95%` of the viewport width up to the defined maximum width.
3. WHEN the modal is open and the underlying content is blurred, THE TailorDetails_Page SHALL prevent pointer events on the blurred background.
4. WHEN the admin clicks outside the modal overlay, THE TailorDetails_Page SHALL close the AddTailor_Form modal.

---

### Requirement 4: Add Tailor Form — Structure and Sections

**User Story:** As an admin, I want a well-structured Add Tailor form with clearly separated sections, so that I can enter all required tailor information efficiently.

#### Acceptance Criteria

1. THE AddTailor_Form SHALL display a "Personal Information" section containing fields: Full Name, Email Address, Mobile Number, and Specialization arranged in a two-column responsive grid.
2. THE AddTailor_Form SHALL display an "Address" section containing a multi-line textarea for the tailor's full address.
3. THE AddTailor_Form SHALL display a "KYC Documents" section containing fields: Aadhar Number, PAN Number, and Other Document arranged in a three-column responsive grid.
4. THE AddTailor_Form SHALL display a teal-700 gradient header with the title "Add New Tailor" and a subtitle.
5. THE AddTailor_Form SHALL display an "Add Tailor" submit button and a "Reset Form" button in the form footer.

---

### Requirement 5: Add Tailor Form — Validation

**User Story:** As an admin, I want the Add Tailor form to validate all fields before submission, so that only well-formed data is sent to the API.

#### Acceptance Criteria

1. WHEN the admin submits the AddTailor_Form with the Full Name field empty, THE AddTailor_Form SHALL prevent submission and display a field-level error message indicating the field is required.
2. WHEN the admin submits the AddTailor_Form with an Email Address that does not match the pattern `[^@]+@[^@]+\.[^@]+`, THE AddTailor_Form SHALL prevent submission and display a field-level error message indicating an invalid email format.
3. WHEN the admin submits the AddTailor_Form with a Mobile Number that does not contain exactly 10 digits, THE AddTailor_Form SHALL prevent submission and display a field-level error message indicating a 10-digit number is required.
4. WHEN the admin submits the AddTailor_Form with an Aadhar Number that does not contain exactly 12 digits, THE AddTailor_Form SHALL prevent submission and display a field-level error message indicating a 12-digit number is required.
5. WHEN the admin submits the AddTailor_Form with a PAN Number that does not match the pattern `[A-Z]{5}[0-9]{4}[A-Z]{1}` (case-insensitive), THE AddTailor_Form SHALL prevent submission and display a field-level error message indicating an invalid PAN format.
6. WHILE the AddTailor_Form fields contain valid data, THE AddTailor_Form SHALL display no validation error messages.

---

### Requirement 6: Add Tailor Form — API Integration and Feedback

**User Story:** As an admin, I want the form to submit tailor data to the API and give me clear feedback on success or failure, so that I know whether the tailor was registered successfully.

#### Acceptance Criteria

1. WHEN the admin submits a valid AddTailor_Form, THE AddTailor_Form SHALL send an HTTP POST request to `http://192.168.1.2:8000/api/v1/auth/email/signup` with a JSON body containing fields: `full_name`, `email`, `mobile`, `address`, `specialization`, `aadhar`, `pan`, `other`.
2. WHILE the AddTailor_Form submission is in progress, THE AddTailor_Form SHALL disable the submit button and display a loading spinner or "Submitting…" label on the submit button.
3. WHEN the API returns a success response, THE AddTailor_Form SHALL display a green Toast_Notification with the message "Tailor added successfully." and reset all form fields to empty.
4. IF the API returns an error response, THEN THE AddTailor_Form SHALL display a red Toast_Notification with the error message from `error.response?.data?.message`, or "Something went wrong. Please try again." if no message is available.
5. THE Toast_Notification SHALL disappear automatically after 3 seconds.

---

### Requirement 7: Add Tailor Form — Reset

**User Story:** As an admin, I want a reset button on the Add Tailor form so that I can clear all fields and start over without reloading the page.

#### Acceptance Criteria

1. WHEN the admin clicks "Reset Form", THE AddTailor_Form SHALL clear all input fields to their empty initial state.
2. WHEN the admin clicks "Reset Form", THE AddTailor_Form SHALL clear any active validation error messages.
3. WHEN the admin clicks "Reset Form", THE AddTailor_Form SHALL clear any active Toast_Notification.

---

### Requirement 8: Full Details Page — Profile Section

**User Story:** As an admin, I want to see the tailor's profile with their avatar, ID, name, phone, and email at the top of the detail page, so that I can quickly identify the tailor I am managing.

#### Acceptance Criteria

1. WHEN FullDetails_Page renders, THE FullDetails_Page SHALL display a circular avatar image sourced from the tailor's profile photo URL, with a fallback placeholder if no photo is available.
2. THE FullDetails_Page SHALL display a camera icon overlay on the avatar that opens a file picker for `.jpg`, `.jpeg`, and `.png` files.
3. WHEN the admin selects a new photo file, THE FullDetails_Page SHALL preview the selected image as the avatar using a local object URL before it is saved.
4. WHILE in Read_Mode, THE FullDetails_Page SHALL display Tailor ID, Full Name, Phone, and Email as read-only labelled fields in a responsive grid beside the avatar.
5. WHILE in Edit_Mode, THE FullDetails_Page SHALL display Tailor ID, Full Name, Phone, and Email as editable input fields in the same responsive grid.

---

### Requirement 9: Full Details Page — Editable Detail Fields

**User Story:** As an admin, I want to edit a tailor's role, status, verification, and address in one place, so that I can update their record without switching screens.

#### Acceptance Criteria

1. WHILE in Read_Mode, THE FullDetails_Page SHALL display Role, Status, Verification, and Address as read-only labelled text values.
2. WHILE in Edit_Mode, THE FullDetails_Page SHALL display Role as a select input with options "Tailor" and "Vendor".
3. WHILE in Edit_Mode, THE FullDetails_Page SHALL display Status as a select input with options "Active" and "Inactive".
4. WHILE in Edit_Mode, THE FullDetails_Page SHALL display Verification as a select input with options "Verified" and "Pending".
5. WHILE in Edit_Mode, THE FullDetails_Page SHALL display Address as an editable multi-line textarea.
6. WHEN the admin clicks the "Edit" button, THE FullDetails_Page SHALL transition from Read_Mode to Edit_Mode, making all editable fields interactive.
7. WHEN the admin clicks "Reset" while in Edit_Mode, THE FullDetails_Page SHALL restore all editable fields to the values loaded from `location.state?.tailor` and return to Read_Mode.

---

### Requirement 10: Full Details Page — KYC Documents Panel

**User Story:** As an admin, I want to view, upload, and delete KYC documents for a tailor, so that I can manage their identity verification documents from the detail page.

#### Acceptance Criteria

1. THE FullDetails_Page SHALL display a KYC_Panel containing three document cards: Aadhaar Card, PAN Card, and Other Document, arranged in a three-column grid.
2. WHEN the admin clicks the "Upload" icon button on a KYC card, THE KYC_Panel SHALL open a file picker that accepts `.jpg`, `.jpeg`, `.png`, and `.pdf` files.
3. WHEN the admin clicks the "View" icon button on a KYC card that has a document, THE KYC_Panel SHALL open the document in a new browser tab.
4. IF a KYC card has no document uploaded, THEN THE KYC_Panel SHALL disable the "View" button and display it in a visually muted state.
5. WHEN the admin clicks the "Delete" icon button on a KYC card that has a document, THE KYC_Panel SHALL display a Confirm_Dialog asking "Delete this document?".
6. WHEN the admin confirms the Confirm_Dialog for document deletion, THE KYC_Panel SHALL remove the document reference from state and update the card to its empty state.

---

### Requirement 11: Full Details Page — Action Buttons

**User Story:** As an admin, I want clearly labeled action buttons — Edit, Save, Reset Password, and Delete Tailor — so that I can manage the tailor record from a single page.

#### Acceptance Criteria

1. THE FullDetails_Page SHALL display an "Edit" button that toggles the page into Edit_Mode.
2. THE FullDetails_Page SHALL display a "Save" button that submits updated field values to the API.
3. THE FullDetails_Page SHALL display a "Reset Password" button that triggers a password reset action for the tailor.
4. THE FullDetails_Page SHALL display a "Delete Tailor" button that initiates the tailor deletion flow.
5. WHILE in Read_Mode, THE FullDetails_Page SHALL keep the "Save" button visible but disabled, or hidden, to prevent accidental saves.

---

### Requirement 12: Full Details Page — Save API Integration

**User Story:** As an admin, I want saving the tailor's details to call the API and give me feedback, so that I know the update was successful or if something went wrong.

#### Acceptance Criteria

1. WHEN the admin clicks "Save" in Edit_Mode, THE FullDetails_Page SHALL send an HTTP PUT or PATCH request to `http://192.168.1.2:8000/api/v1/tailors/{id}` with the updated tailor fields as a JSON body.
2. WHILE the save request is in progress, THE FullDetails_Page SHALL disable the "Save" button and display a loading indicator on it.
3. WHEN the API returns a success response for save, THE FullDetails_Page SHALL display a green Toast_Notification with the message "Details saved successfully." and transition back to Read_Mode.
4. IF the API returns an error response for save, THEN THE FullDetails_Page SHALL display a red Toast_Notification with the error message from the response or a fallback message, and remain in Edit_Mode.

---

### Requirement 13: Full Details Page — Delete Tailor

**User Story:** As an admin, I want to delete a tailor after explicit confirmation, so that I do not accidentally remove tailor records.

#### Acceptance Criteria

1. WHEN the admin clicks "Delete Tailor", THE FullDetails_Page SHALL display a Confirm_Dialog with the message "Are you sure you want to delete this tailor? This action cannot be undone."
2. WHEN the admin confirms the Confirm_Dialog, THE FullDetails_Page SHALL send an HTTP DELETE request to `http://192.168.1.2:8000/api/v1/tailors/{id}`.
3. WHEN the admin cancels the Confirm_Dialog, THE FullDetails_Page SHALL take no further action.
4. WHEN the delete API returns a success response, THE FullDetails_Page SHALL navigate back to the TailorDetails_Page (`/tailorDetails`).
5. IF the delete API returns an error response, THEN THE FullDetails_Page SHALL display a red Toast_Notification with an appropriate error message.

---

### Requirement 14: Full Details Page — Reset Password

**User Story:** As an admin, I want to trigger a password reset for a tailor directly from their detail page, so that I can assist tailors who are locked out of their accounts.

#### Acceptance Criteria

1. WHEN the admin clicks "Reset Password", THE FullDetails_Page SHALL display a Confirm_Dialog with the message "Send password reset to this tailor's email?".
2. WHEN the admin confirms the Confirm_Dialog, THE FullDetails_Page SHALL send an HTTP POST request to `http://192.168.1.2:8000/api/v1/tailors/{id}/reset-password`.
3. WHEN the reset-password API returns a success response, THE FullDetails_Page SHALL display a green Toast_Notification with the message "Password reset email sent successfully."
4. IF the reset-password API returns an error response, THEN THE FullDetails_Page SHALL display a red Toast_Notification with an appropriate error message.

---

### Requirement 15: Full Details Page — Loading and Error States

**User Story:** As an admin, I want the Full Details page to handle loading and API error states gracefully, so that I always know what is happening and the UI does not break.

#### Acceptance Criteria

1. WHILE any API request (save, delete, reset password) is in progress, THE FullDetails_Page SHALL disable all action buttons to prevent duplicate submissions.
2. IF FullDetails_Page mounts with no tailor state data (`location.state?.tailor` is undefined), THEN THE FullDetails_Page SHALL display a user-visible error message such as "No tailor data found. Please go back and try again." alongside a "Back" navigation button.
3. THE FullDetails_Page SHALL display a "Back" button in the header that navigates to `/tailorDetails`.
