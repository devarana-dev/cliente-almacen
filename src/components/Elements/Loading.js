import { Spin } from "antd";

import "../../assets/scss/loading.scss";

export default function Loading() {
    return (
        <div className="loading">
            <div className="loading__spinner">
                <div class="loader">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
        </div>
    )
};
