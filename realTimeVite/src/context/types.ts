export interface Member {
    id: string;
    name: string
}

export interface MemberContextType {
    members: Member[]
    setMembers: (value: Member[]) => void
}