import { EditClipForm } from "@/utils/edit/[clip_id]/components";
import { Modal } from "@/utils/global/components";

export default async function Page({ params }: { params: { clip_id: string } }) {
    const { clip_id } = params;

    return (
        <>
        <Modal>
            <EditClipForm clipId={clip_id} />
        </Modal>
        </>
    )
}