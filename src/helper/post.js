export function getVisits(metadataList) {
    if (metadataList) {
        let metadata = metadataList.filter(ele => ele.key === 'VISITS')
        if (metadata) {
            return metadata[0].value
        }
    }

    return 0
}
