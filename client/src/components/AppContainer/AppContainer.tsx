import React, { ReactElement } from "react";

export const AppContainer = (): ReactElement => (
  <div className="min-h-screen flex justify-center items-center">
    <div className="container mx-auto px-4">
      {/*<h1 className="text-3xl font-bold">
        Hello world!
      </h1>
      <button className="btn btn-secondary">Button</button>*/}
      <div className="card w-96 bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="card-body">
          <h2 className="card-title">Shoes!</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="stats bg-primary text-primary-content shadow-2xl">
        <div className="stat">
          <div className="stat-title">Account balance</div>
          <div className="stat-value">$89,400</div>
          <div className="stat-actions">
            <button className="btn btn-sm btn-success">Add funds</button>
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Current balance</div>
          <div className="stat-value">$89,400</div>
          <div className="stat-actions">
            <button className="btn btn-sm">Withdrawal</button>
            <button className="btn btn-sm">Deposit</button>
          </div>
        </div>

      </div>
    </div>
  </div>
);