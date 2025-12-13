export interface FriendRequest {
    id: string;
    sender_id: string
    receiver_id: string;
    created_at: Date;
    status: 'pending' | 'accepted' | 'blocked';
};

