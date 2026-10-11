import { Card, CardContent } from "./ui/card";

export default function CardComponent({ nama }) {
    return (
        <Card className="border ring-0 py-3 rounded-md">
            <CardContent className="px-3">
                <h1 className="font-semibold text-gray-800">{nama}
                </h1>
            </CardContent>
        </Card>
    )
}
