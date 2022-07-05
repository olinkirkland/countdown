A single-purpose website that counts down to when my wife comes back from Houston.

20Wk Update:

// Requests

GET /rewards/next
	Returns either the next locked reward OR the time at which that reward will unlock
GET /rewards/all
	Returns an array of previously unlocked rewards
POST /rewards/unlock
	Unlock next reward
	Generates the next reward & updates the time at which that reward will unlock
POST /login
	Returns a token for the user if they logged in correctly

// Plan

User can unlock a reward by tapping quickly on a gift icon, that then animates and reveals the reward.

Rewards are sometimes instantly redeemed (a poem or art, or something like that) or are a task I must perform by notifying me that a reward was unlocked (at which point I personally perform the task), or they can be redeemed at a later time at will (these coupons must be downloaded and printed out).

Some rewards require a task to be performed in order to unlock them.

// Reward ideas

1. Flower Delivery (trigger)
2. Personal Poem (instant)
3. Story fragment (instant)
4. Selfies (trigger)
5. Order food (coupon)
6. LEGO by mail (trigger)
7. Watch an episode of any TV show (coupon, time-restricted)
