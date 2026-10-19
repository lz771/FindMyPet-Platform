import { Post } from "@/components/web/PostCard";

// Used to sort posts from most recent to oldest (createdAt / lastModifiedAt) date time
export function heapSort(posts: Post[], dateType: string) {
    let heapSize = posts.length;

    // Convert object array into min heap
    for (let i = Math.floor(posts.length / 2) - 1; i >= 0; i--) {
        minHeapify(posts, i, heapSize, dateType);
    }

    // Sort the array from most recent to oldest date time
    for (let i = posts.length - 1; i >= 1; i--) {
        swap(posts, 0, i);
        heapSize--;
        minHeapify(posts, 0, heapSize, dateType);
    }
}

// Restore min heap
function minHeapify(posts: Post[], idx: number, heapSize: number, dateType: string) {
    let left = 2 * idx + 1;
    let right = 2 * idx + 2;
    let oldest = idx; // Set oldest node to the parent node

    // Set oldest to left child if the left child is oldest than or equal to its parent  
    if (left < heapSize) {
        // Conditionally compare nodes based on what date type it is (lastModifiedAt or createdAt)
        const isLeftOlderThanRoot = dateType === "lastModifiedAt"
            ? posts[left].lastModifiedAt.getTime() <= posts[oldest].lastModifiedAt.getTime()
            : posts[left].createdAt.getTime() <= posts[oldest].createdAt.getTime();

        if (isLeftOlderThanRoot) oldest = left;
    } 

    // Set oldest to the right child if the right child node is oldest than current oldest node
    if (right < heapSize){
    const isRightOlderThanSmallest = dateType === "lastModifiedAt"
        ? posts[right].lastModifiedAt.getTime() <= posts[oldest].lastModifiedAt.getTime()
        : posts[right].createdAt.getTime() <= posts[oldest].createdAt.getTime();

        if (isRightOlderThanSmallest) oldest = right;
    }

    // Continue to heapify the subtree until a min heap is restored
    if (oldest != idx) {
        swap(posts, idx, oldest);
        minHeapify(posts, oldest, heapSize, dateType);
    }
}

// Swap two elements in an array
function swap(posts: Post[], idx1: number, idx2: number) {
    let temp = posts[idx1];
    posts[idx1] = posts[idx2];
    posts[idx2] = temp;
}