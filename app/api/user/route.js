import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

// More secure password handling
const adminPasswordList = process.env.ADMIN_PASSWORD_LIST;
const passwordList = adminPasswordList ? adminPasswordList.split(",") : [];

if (passwordList.length === 0) {
  console.error("WARNING: No admin passwords configured in environment variables");
}

export async function POST(request) {
  try {
    let res;
    try {
      res = await request.json();
    } catch (err) {
      console.error("Failed to parse request JSON:", err);
      return Response.json({
        status: "error",
        message: "Invalid request format",
      }, { status: 400 });
    }
    
    const { hash } = res;
    
    // Check if already logged in
    const cookieStore = await cookies();
    const cookieSet = cookieStore.get("token");
    
    if (cookieSet) {
      return Response.json({
        status: "success", // Changed from error to success
        message: "Already logged in",
      });
    }

    // Validate input
    if (!hash) {
      return Response.json({
        status: "error",
        message: "Password is required",
      }, { status: 400 });
    }

    // Check if password matches any in the list
    for (let i = 0; i < passwordList.length; i++) {
      const storedPassword = passwordList[i];
      const isMatch = await bcrypt.compare(storedPassword, hash);
      if (isMatch) {
        // Generate a token with meaningful identifier
        const tokenPayload = `admin-user-${Date.now()}`;
        const token = await bcrypt.hash(tokenPayload, 10);

        // Set cookie
        cookieStore.set("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return Response.json({
          status: "success",
          message: "Login successful",
        });
      }
    }

    // No password matched
    return Response.json({
      status: "error",
      message: "Invalid password",
    }, { status: 401 });
  } catch (error) {
    console.error("Login error:", error);

    return Response.json({
      status: "error",
      message: "An error occurred during login",
    }, { status: 500 });
  }
}

// GET method remains unchanged
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    if (token) {
      return Response.json({
        status: "success",
        authenticated: true,
      });
    }

    return Response.json({
      status: "success",
      authenticated: false,
    });
  } catch (error) {
    return Response.json({
      status: "error",
      message: "Failed to check authentication status",
    }, { status: 500 });
  }
}
