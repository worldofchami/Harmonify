import { NewClipForm } from "@/utils/clips/new/components";
import { Modal } from "@/utils/global/components";

export default async function Page() {
    return (
        <>
        <Modal>
            <NewClipForm />
        </Modal>
        </>
    )
}