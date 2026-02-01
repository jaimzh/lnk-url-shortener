# How `lnk` Actually Works (A Brain Dump)

Haha, I was once like you. I thought URL shortening was some form of dark magic or straight-up sorcery. But once you peel back the curtain, it’s actually pretty simple.

At a high level, it's just **mapping strings to specific addresses** stored in a database. Here is how we break it down step-by-step.

---

### Step 1: The Input & The "Nickname" (Alias)

First, we take a long, messy link—let's say `https://google.com`.

Instead of using that long string, we link it to a randomly generated string. In the dev world, we call this an **Alias** (which is just a fancy way of saying a nickname).

- **Original Link:** `google.com`
- **Alias:** `123random`

---

### Step 2: Storing the Pair

Now we need to make sure the internet doesn't forget this relationship. We send both the original link and the alias to the backend to be stored together in a database.

Think of it like a simple table:

| Alias (The Key) | Original URL (The Value) |
| :-------------- | :----------------------- |
| `123random`     | `https://google.com`     |
| `apple-link`    | `https://apple.com`      |

In the code, it looks a bit like this:

```typescript
{
  originalUrl: "https://google.com",
  alias: "123random",
  createdAt: Date.now()
}
```

---

### Step 3: Returning the New Link

Once it’s safely stored, we give the user back a brand new, short URL. It looks like this:

`baseurl/[stored_alias]` -> `lnk.sh/123random`

The **Base URL** is just our website's address. The magic is all in that little string at the end.

---

### Step 4: The "Secret Sauce" (The Logic)

Okay, come a little closer for this part because this is where it all makes sense.

Each time someone clicks that short link (`lnk.sh/123random`), a piece of code in our backend wakes up. It grabs the `123random` part from the link and shouts into the database:

> _"Ayyyy yo! Who in here is linked to '123random'?"_

And `google.com` raises its hand and says, _"That’s me!"_

---

### Step 5: The Final Jump

The moment the backend finds that original URL, it doesn't even show a page to the user. It just tells the browser: **"Hey, don't stay here, go straight to google.com."**

It’s called a **Redirect**.

```typescript
// Simplified Backend Logic
const destination = await Database.find({ alias: "123random" });

if (destination) {
  return Response.redirect(destination.originalUrl);
}
```

---

### Summary in 3 Steps:

1. **Generate a nickname** for the long link.
2. **Store both** in a database so they're "married."
3. **Search & Redirect:** When someone uses the nickname, find the partner and open it.

No sorcery, just a really organized filing system! 🚀
